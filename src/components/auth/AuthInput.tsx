"use client";

import { ReactNode } from "react";

type AuthInputProps = {
  label?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function AuthInput({
  label,
  icon,
  trailing,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-[2px] w-full">
      {label && (
       <span className="text-[12px] font-medium text-white/70 leading-[1.6]">
          {label}
        </span>
      )}
      <div className="flex items-center gap-3 h-[46px] w-full rounded-[10px] border border-[#EDF1F3] bg-white px-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
        {icon && <span className="shrink-0 text-[#1A1C1E]">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="flex-1 min-w-0 text-[14px] font-medium text-[#1A1C1E] tracking-[-0.14px] placeholder:text-[#ACB5BB] outline-none bg-transparent"
        />
        {trailing}
      </div>
    </div>
  );
}