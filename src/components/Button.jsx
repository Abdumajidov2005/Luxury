import { FiArrowRight } from 'react-icons/fi';

/**
 * Button / link with consistent styling.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <FiArrowRight className="btn__icon" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...rest}>
      {content}
    </button>
  );
}
