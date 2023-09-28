import { useState } from 'react';

type DropdownProps = {
  title: string;
  content: string;
}

const DropdownItem = ({ title, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <h2 
        className="cursor-pointer hover:underline font-bold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </h2>
      {isOpen && <div className="ml-4">{content}</div>}
    </div>
  );
};

export default DropdownItem;