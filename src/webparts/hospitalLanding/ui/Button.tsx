import * as React from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonTone = 'brand' | 'warm' | 'gold' | 'deep';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'leading' | 'trailing';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  noLift?: boolean;
  size?: ButtonSize;
  tone?: ButtonTone;
  variant?: ButtonVariant;
}

const variantClassMap: Record<ButtonVariant, string> = {
  solid: styles.solid,
  outline: styles.outline,
  ghost: styles.ghost
};

const toneClassMap: Record<ButtonTone, string> = {
  brand: styles.toneBrand,
  warm: styles.toneWarm,
  gold: styles.toneGold,
  deep: styles.toneDeep
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg
};

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  icon,
  iconPosition = 'trailing',
  noLift = false,
  size = 'md',
  tone = 'brand',
  type = 'button',
  variant = 'solid',
  ...buttonProps
}) => {
  const buttonClassName = [
    styles.button,
    variantClassMap[variant],
    toneClassMap[tone],
    sizeClassMap[size],
    noLift ? styles.noLift : '',
    className ? className : ''
  ].filter(Boolean).join(' ');

  const iconClassName = [
    styles.icon,
    iconPosition === 'leading' ? styles.iconLeading : styles.iconTrailing
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      <span className={styles.label}>{children}</span>
      {icon ? (
        <span className={iconClassName} aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </button>
  );
};

export default Button;
