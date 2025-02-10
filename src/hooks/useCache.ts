import { useState, useEffect } from "react";
import { cacheManager } from "../services/cache";
import { apiService } from "@/services/api";

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 先尝试从缓存获取
        const cached = await cacheManager.get<T>(key, { ttl });
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        // 缓存不存在或过期，重新获取
        const fresh = await fetcher();
        await cacheManager.set(key, fresh, { ttl });
        setData(fresh);
      } catch (error) {
        console.error("Cache loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key]);

  return { data, loading };
}

// 使用示例
// function UserProfile() {
//   const { data: profile, loading } = useCache(
//     "user_profile",
//     () => apiService.user.getProfile(),
//     1000 * 60 * 5 // 5分钟缓存
//   );

//   if (loading) return <Loading />;
//   return <ProfileView data={profile} />;
// }
