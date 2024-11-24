import { FaLinkedin } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.linkedin.com/in/sahil-singh-604978310/">
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
