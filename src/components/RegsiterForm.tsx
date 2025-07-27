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
import { useRegisterForm } from "@/hooks/useRegisterForm";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff, Ghost } from "lucide-react";

interface RegisterFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

export function RegisterForm({
  className,
  onSuccess,
  ...props
}: RegisterFormProps) {
  const { form, handleSubmit } = useRegisterForm();
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
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col items-center text-center gap-1 mb-6">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground text-sm">
                Get started with us today
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Full Name</Label>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            variant={"ghost"}
                            type="button"
                            onClick={passwordToggle.handleToggleVisibility}
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={passwordToggle.type}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            variant={"ghost"}
                            type="button"
                            onClick={passwordToggle.handleToggleVisibility}
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
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

                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>

          <div className="bg-muted relative hidden md:block">
            <DotLottieReact src="/register.lottie" loop autoplay />
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
