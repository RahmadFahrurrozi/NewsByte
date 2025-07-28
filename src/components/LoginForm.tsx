import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLoginFormUser } from "@/hooks/useLoginForm";
import Link from "next/link";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

export function LoginForm({ className, onSuccess, ...props }: LoginFormProps) {
  const { form, onSubmit, loading } = useLoginFormUser();
  const passwordToggle = usePasswordToggle();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-2xl w-full mx-4 md:mx-0",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 border md:grid-cols-2">
          <div className="p-6 md:py-12 md:px-6 border">
            <Form {...form}>
              <div className="flex flex-col items-center text-center gap-1 mb-6">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-sm">
                  Login to your account
                </p>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="placeholder:text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={passwordToggle.type}
                            {...field}
                            placeholder="***********"
                            className="placeholder:text-muted-foreground"
                          />
                          <Button
                            variant={"ghost"}
                            type="button"
                            className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                            onClick={passwordToggle.handleToggleVisibility}
                          >
                            {passwordToggle.showPassword ? (
                              <Eye className="text-muted-foreground size-4" />
                            ) : (
                              <EyeOff className="text-muted-foreground size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="flex items-center justify-end cursor-pointer">
                  <Link
                    href="/forgot-password"
                    className="text-sm hover:underline underline-offset-2"
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="underline underline-offset-4"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="bg-muted relative hidden md:block">
            <DotLottieReact src="/login.lottie" loop autoplay />
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-center text-xs">
        By continuing, you agree to our{" "}
        <Link href="#" className="underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
