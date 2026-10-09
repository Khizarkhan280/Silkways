export default function AuthInput({ icon: Icon, ...inputProps }) {
  return (
    <label className="auth-input">
      <Icon />
      <input className="auth-input-field" {...inputProps} />
    </label>
  );
}