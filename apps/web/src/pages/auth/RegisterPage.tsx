import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { RegisterSchema, type RegisterInput, PASSWORD_MIN_LENGTH } from '@thinkspace/shared';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/services/authApi';
import { getErrorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';

function PasswordStrengthIndicator({ password }: { password: string }) {
  const checks = [
    { label: `At least ${PASSWORD_MIN_LENGTH} characters`, valid: password.length >= PASSWORD_MIN_LENGTH },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains a number', valid: /[0-9]/.test(password) },
  ];

  if (!password) return null;

  return (
    <ul className="mt-2 space-y-1">
      {checks.map((check) => (
        <li key={check.label} className="flex items-center gap-1.5 text-xs">
          {check.valid ? (
            <Check className="h-3 w-3 text-green-500 shrink-0" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground shrink-0" />
          )}
          <span className={check.valid ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
            {check.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function RegisterPage() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const watchedPassword = watch('password', '');

  async function onSubmit(data: RegisterInput) {
    try {
      await authApi.register(data);
      await refreshUser();
      toast.success('Welcome to ThinkSpace! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Join ThinkSpace and start sharing your thoughts
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Display name */}
        <div className="space-y-1.5">
          <label htmlFor="reg-displayName" className="text-sm font-medium">
            Display Name
          </label>
          <input
            {...register('displayName')}
            id="reg-displayName"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            className="input"
          />
          {errors.displayName && (
            <p className="text-xs text-destructive">{errors.displayName.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label htmlFor="reg-username" className="text-sm font-medium">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
            <input
              {...register('username')}
              id="reg-username"
              type="text"
              autoComplete="username"
              placeholder="yourhandle"
              className="input pl-7"
              aria-invalid={!!errors.username}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-destructive">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="text-sm font-medium">
            Email
          </label>
          <input
            {...register('email')}
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="reg-password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className="input pr-10"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <PasswordStrengthIndicator password={watchedPassword} />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label htmlFor="reg-confirm" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            id="reg-confirm"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            className="input"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.98 }}
          className="btn-primary btn-lg w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
