export const Checkbox = ({ label = '', isChecked, onChange }: { label?: string, isChecked: boolean, onChange: (isChecked: boolean) => void }) => (
    <label className="flex items-center justify-start gap-2">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={(event) => onChange(event.target.checked)}
        />
        {label}
    </label>
);
