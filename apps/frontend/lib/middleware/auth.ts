import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  email?: string;
  role?: string;
}

export function verifyToken(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return { error: "No token provided", status: 401 };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as CustomJwtPayload;
    
    return { user: decoded, error: null };
  } catch (error) {
    console.error("Token verification error:", error);
    return { error: "Invalid token", status: 401 };
  }
}

export function requireAdmin(request: Request) {
  const { user, error, status } = verifyToken(request);
  
  if (error) {
    return { error, status };
  }
  
  if (user?.role !== "admin") {
    return { error: "Admin access required", status: 403 };
  }
  
  return { user, error: null, status: null };
}
