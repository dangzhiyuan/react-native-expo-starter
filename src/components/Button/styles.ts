export const getButtonStyles = (
  theme: Theme,
  variant: ButtonVariant = "primary"
) => {
  const baseStyles: ViewStyle = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: theme.primary,
    },
    secondary: {
      backgroundColor: theme.secondary,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.primary,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    error: {
      backgroundColor: theme.error,
    },
    success: {
      backgroundColor: theme.success,
    },
    warning: {
      backgroundColor: theme.warning,
    },
  };

  return {
    container: {
      ...baseStyles,
      ...variantStyles[variant],
    },
  };
};

export const getTextStyles = (
  theme: Theme,
  variant: ButtonVariant = "primary"
) => {
  const baseStyles: TextStyle = {
    fontSize: 16,
    fontWeight: "600",
  };

  const variantStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: theme.text.inverse,
    },
    secondary: {
      color: theme.text.inverse,
    },
    outline: {
      color: theme.primary,
    },
    ghost: {
      color: theme.text.primary,
    },
    error: {
      color: theme.text.inverse,
    },
    success: {
      color: theme.text.inverse,
    },
    warning: {
      color: theme.text.inverse,
    },
  };

  return {
    text: {
      ...baseStyles,
      ...variantStyles[variant],
    },
  };
};
