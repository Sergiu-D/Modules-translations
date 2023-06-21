import Input from "@mui/base/Input";

const TokenInput = ({ value, handleChange }) => {
  return (
    <div>
      <label>Your Github token</label>
      <Input value={value} onChange={handleChange} />
    </div>
  );
};

export default TokenInput;
