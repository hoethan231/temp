"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";

/** Login page always forces light theme so it ignores global dark-mode setting. */
export default function LoginPage() {
  const { setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Role state: "admin" or "user"
  const [role, setRole] = useState<"admin" | "user">("admin");
  const router = useRouter();

  // Force light mode once when component mounts
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth flow
    const destination = role === "user" ? "/users" : "/";
    router.push(destination);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003366]">
      <div className="w-full h-screen">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left side - Info panel */}
          <div className="bg-[#002244] p-8 text-white flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6 max-w-md">
              <Image
                src="/seal.png"
                alt="RERS Seal"
                width={120}
                height={120}
                className="h-30 w-30"
              />
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Rapid Emergency Response System</h1>
                <p className="text-[#a3c2e0]">Authorized Personnel Only</p>
              </div>
              <div className="w-full border-t border-[#a3c2e0]/30 pt-4">
                <p className="text-sm text-[#a3c2e0]">
                  This system contains U.S. Government information. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="bg-[#003366] p-8 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Sign In</h2>
                <p className="text-sm text-[#a3c2e0] mt-1">
                  Enter your credentials to access the system
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3c2e0]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 bg-[#002244]/50 border-[#a3c2e0]/30 text-white placeholder:text-[#a3c2e0] focus:border-[#a3c2e0] focus:ring-[#a3c2e0]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3c2e0]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9 bg-[#002244]/50 border-[#a3c2e0]/30 text-white placeholder:text-[#a3c2e0] focus:border-[#a3c2e0] focus:ring-[#a3c2e0]"
                    />
                  </div>
                </div>

                {/* Role Toggle */}
                <div className="flex items-center space-x-4 pt-4">
                  <span className="text-sm font-medium text-white">Admin</span>
                  <Switch
                    checked={role === "user"}
                    onCheckedChange={(checked) => setRole(checked ? "user" : "admin")}
                  />
                  <span className="text-sm font-medium text-white">User</span>
                </div>

                <Button type="submit" className="w-full bg-[#002244] hover:bg-[#001a33] text-white">
                  Sign in
                </Button>
              </form>

              <div className="border-t border-[#a3c2e0]/30 pt-4">
                <p className="text-xs text-[#a3c2e0] text-center">
                  By signing in, you agree to our{' '}
                  <Link href="#" className="text-white hover:text-[#a3c2e0]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-white hover:text-[#a3c2e0]">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
