import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { PostCard } from "../components/PostCard/PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const PostListScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 假设这是从API获取数据
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPosts([
          {
            id: "1",
            title: "示例文章标题",
            content: "这是文章内容...",
            author: {
              name: "张三",
              avatar: "https://example.com/avatar.jpg",
            },
          },
          // ... 更多文章
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        // 显示骨架屏
        <>
          <PostCard loading />
          <PostCard loading />
          <PostCard loading />
        </>
      ) : (
        // 显示实际内容
        posts.map((post) => <PostCard key={post.id} data={post} />)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
