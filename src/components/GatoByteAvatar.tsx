import gatoImg from "../assets/gato.jpg";

interface GatoByteAvatarProps {
  size?: number;
}

export default function GatoByteAvatar({ size = 84 }: GatoByteAvatarProps) {
  return (
    <img
      src={gatoImg}
      alt="Gato Byte"
      width={size}
      height={size}
      style={{
        display: "block",
        objectFit: "cover",
        borderRadius: "50%",
        border: "3px solid rgba(192, 132, 252, 0.7)",
        boxShadow: "0 0 12px rgba(192, 132, 252, 0.5)",
      }}
    />
  );
}
