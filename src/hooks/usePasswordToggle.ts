import { useState } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => setShowPassword((prev) => !prev);

  const type = showPassword ? "text" : "password";

  return { type, showPassword, handleToggleVisibility };
}
