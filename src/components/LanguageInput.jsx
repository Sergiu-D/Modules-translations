import Input from "@mui/base/Input";

export default function LanguageInput({ value, handleChange }) {
  return (
    <div>
      <label>Languages</label>
      <Input value={value} onChange={handleChange} />
    </div>
  );
}
