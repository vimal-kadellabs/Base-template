/**
 * LoginContent Component
 * Content displayed alongside login form when using left/right layout
 */

import React from 'react';
import { Shield, CheckCircle, Lock, Users } from 'lucide-react';

export function LoginContent() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Enterprise-grade security for your data',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete control over user permissions',
    },
    {
      icon: Lock,
      title: 'Role-Based Access',
      description: 'Define roles and permissions easily',
    },
  ];

  return (
    <div className="max-w-lg text-center lg:text-left" data-testid="login-content">
      {/* Logo/Brand */}
      <div className="mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-4">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Powerful tools to manage your application
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="flex items-start gap-4 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })};
      </div>

      {/* Testimonial or additional info */}
      <div className="mt-8 p-4 rounded-lg bg-background/50 border border-border">
        <p className="text-sm text-muted-foreground italic">
          "The most intuitive admin panel we've ever used. Setup was a breeze!"
        </p>
        <p className="text-sm font-medium text-foreground mt-2">
          — Happy Customer
        </p>
      </div>
    </div>
  );
}

export default LoginContent;
