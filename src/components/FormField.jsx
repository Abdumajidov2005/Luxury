/**
 * Labelled form control with an accessible error message.
 * Pass `as="select"` for a dropdown; children become its <option>s.
 */
export default function FormField({ id, label, error, as = 'input', className = '', children, ...props }) {
  const Control = as;
  const errorId = `${id}-error`;

  return (
    <div className={`field ${error ? 'field--invalid' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <Control
        id={id}
        name={id}
        className="field__control"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </Control>
      <p className="field__error" id={errorId} role={error ? 'alert' : undefined}>
        {error || ''}
      </p>
    </div>
  );
}
