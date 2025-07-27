import { useState } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  const toogleVisibility = () => setShowPassword((prev) => !prev);

  const type = showPassword ? "text" : "password";

  return { type, showPassword, toogleVisibility };
}
