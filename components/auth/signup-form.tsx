"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface SignupFormProps {
  onToggleMode: () => void;
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = await signup(
      formData.email,
      formData.password,
      formData.name
    );
    if (!success) {
      setError("Email already exists or signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-3 sm:p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-sm sm:text-base dark:text-gray-300">
            Sign up to start managing your items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
                className="transition-all duration-200 focus:scale-[1.02]"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                className="transition-all duration-200 focus:scale-[1.02]"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Create a password"
                  className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm your password"
                className="transition-all duration-200 focus:scale-[1.02]"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center animate-in fade-in-0 slide-in-from-top-1 duration-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onToggleMode}
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                disabled={isLoading}
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
