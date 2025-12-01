import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

interface IconProps {
  onClick?: () => void;
}

export const CheckIcon = ({ onClick }: IconProps) => {
  return <FontAwesomeIcon icon="circle-check" onClick={onClick} />;
};

export const TrashIcon = ({ onClick }: IconProps) => {
  return <FontAwesomeIcon icon="trash" onClick={onClick} />;
};
