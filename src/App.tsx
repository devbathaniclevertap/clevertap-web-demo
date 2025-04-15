import clevertap from "clevertap-web-sdk";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket, Terminal, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FunctionCard } from "./components/FunctionCard";
import { InputField } from "./components/InputField";
import { ResultPanel } from "./components/ResultPanel";
import { userSchema } from "./schemas/userSchema";
import { clevertapService } from "./services/clevertapService";
const firebaseConfig = {
  apiKey: "AIzaSyCBbr1yE0m3p-k8oBuLTPJKil9DzjuekQY",
  authDomain: "clevertap-web-demo.firebaseapp.com",
  projectId: "clevertap-web-demo",
  storageBucket: "clevertap-web-demo.firebasestorage.app",
  messagingSenderId: "69291670964",
  appId: "1:69291670964:web:1feec404d249322cac86e1",
  measurementId: "G-LTH23DJ9RN",
};
const functions = [
  { id: "getClevertapId", icon: Terminal, label: "Get CleverTap ID" },
  { id: "onUserLogin", icon: Rocket, label: "User Login" },
  { id: "recordEvent", icon: Zap, label: "Record Event" },
];

interface UserData {
  name: string;
  email: string;
  identity: string;
  phone: string;
  eventName: string;
}

interface ValidationErrors {
  [key: string]: string;
}

function App() {
  const [selectedFunction, setSelectedFunction] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    identity: "",
    phone: "",
    eventName: "",
  });

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    // Initialize CleverTap
    clevertap.init("TEST-468-488-R47Z");
    clevertap.spa = true;
    clevertap.setLogLevel(3);
  }, []);

  const handleInputChange = (field: keyof UserData) => (value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (functionId: string) => {
    try {
      if (functionId === "recordEvent") {
        // Only validate eventName for recordEvent
        if (!userData.eventName.trim()) {
          setErrors({ eventName: "Event name is required" });
          return false;
        }
        setErrors({});
        return true;
      } else if (functionId === "onUserLogin") {
        // Validate all fields for onUserLogin
        userSchema.parse(userData);
        setErrors({});
        return true;
      }
      // No validation needed for getClevertapId
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleExecute = async (functionId: string) => {
    if (!validateForm(functionId)) {
      setResult("Please fix the validation errors");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setSelectedFunction(functionId);

    try {
      let response;
      const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      switch (functionId) {
        case "getClevertapId":
          response = await clevertapService.getClevertapId();
          break;
        case "onUserLogin":
          response = await clevertapService.onUserLogin({
            name: userData.name,
            email: userData.email,
            identity: userData.identity,
            phone: userData.phone,
          });
          break;
        case "recordEvent":
          response = await clevertapService.recordEvent(userData.eventName);
          break;
        default:
          response = "Invalid function";
      }
      setResult(`${response} at ${timestamp}`);
    } catch (error) {
      setResult(`Error executing function : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-800 to-rose-900 animate-gradient p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 relative"
      >
        <div className="text-center space-y-2 sm:space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-red-100"
          >
            CleverTap Testing Interface
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-rose-200/80"
          >
            Select a function to test CleverTap integration
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {functions.map((func, index) => (
            <motion.div
              key={func.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FunctionCard
                icon={func.icon}
                label={func.label}
                isSelected={selectedFunction === func.id}
                isLoading={isLoading && selectedFunction === func.id}
                onClick={() => handleExecute(func.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleInputChange("name")}
              error={errors.name}
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={userData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
            />
            <InputField
              label="Identity"
              placeholder="Enter identity"
              value={userData.identity}
              onChange={handleInputChange("identity")}
              error={errors.identity}
            />
            <InputField
              label="Phone Number"
              placeholder="Enter phone number"
              type="tel"
              value={userData.phone}
              onChange={handleInputChange("phone")}
              error={errors.phone}
            />
            <div className="sm:col-span-2">
              <InputField
                label="Event Name"
                placeholder="Enter event name"
                value={userData.eventName}
                onChange={handleInputChange("eventName")}
                error={errors.eventName}
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {(result || isLoading) && (
            <ResultPanel result={result} isLoading={isLoading} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
