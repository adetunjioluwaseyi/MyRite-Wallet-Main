"use client";

type Props = {
  onSubmit: () => void;
  disabled: boolean;
};

export default function SubmitPackButton({ onSubmit, disabled }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <button disabled={disabled} onClick={onSubmit}>
        Submit Pack Numbers
      </button>
    </div>
  );
}