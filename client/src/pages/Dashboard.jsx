// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Droplets,
//   Thermometer,
//   Heart,
//   Zap,
//   Battery,
//   Activity,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Settings,
//   Bell,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";

// const Dashboard = () => {
//   const [healthData, setHealthData] = useState({
//     hydration: 0,
//     temperature: 0,
//     heartRate: 0,
//     gsr: 0,
//     bioimpedance: 0,
//   });
//   const [lastUpdate, setLastUpdate] = useState(new Date());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch data from backend
//   const fetchHealthData = async () => {
//     try {
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_BACKEND_URL
//         }/api/getData/693429901f7364e2c6ee76e9`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();

//       if (result.success) {
//         const { data } = result;

//         // Update state with backend data in a single update
//         setHealthData({
//           hydration: data.hydration,
//           temperature: data.temperature,
//           heartRate: data.heartRate,
//           gsr: data.gsr,
//           bioimpedance: data.bioimpedance,
//         });
//         setLastUpdate(new Date(data.timestamp));

//         // Clear any previous errors
//         setError(null);
//       }
//     } catch (err) {
//       setError("Failed to fetch health data");
//       console.error(err);
//     } finally {
//       // Only set loading to false on initial load
//       if (loading) {
//         setLoading(false);
//       }
//     }
//   };

//   // Fetch data on component mount and set up interval
//   useEffect(() => {
//     // Initial fetch
//     fetchHealthData();

//     // Set up interval to fetch data every 3 seconds
//     const interval = setInterval(() => {
//       fetchHealthData();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []); // Empty dependency array to prevent re-creating interval

//   // Get status based on values
//   const getHydrationStatus = (value) => {
//     if (value >= 70)
//       return { status: "Optimal", color: "bg-green-500", icon: CheckCircle };
//     if (value >= 50)
//       return { status: "Good", color: "bg-blue-500", icon: Activity };
//     if (value >= 30)
//       return { status: "Low", color: "bg-yellow-500", icon: AlertTriangle };
//     return { status: "Critical", color: "bg-red-500", icon: AlertTriangle };
//   };

//   const getTemperatureStatus = (value) => {
//     if (value >= 36.0 && value <= 37.5)
//       return { status: "Normal", color: "bg-green-500", icon: CheckCircle };
//     if (value >= 37.6 && value <= 38.0)
//       return {
//         status: "Elevated",
//         color: "bg-yellow-500",
//         icon: AlertTriangle,
//       };
//     if (value > 38.0)
//       return { status: "Fever", color: "bg-red-500", icon: AlertTriangle };
//     return { status: "Low", color: "bg-blue-500", icon: AlertTriangle };
//   };

//   const getHeartRateStatus = (value) => {
//     if (value >= 60 && value <= 100)
//       return { status: "Normal", color: "bg-green-500", icon: CheckCircle };
//     if (value >= 101 && value <= 120)
//       return {
//         status: "Elevated",
//         color: "bg-yellow-500",
//         icon: AlertTriangle,
//       };
//     if (value > 120)
//       return { status: "High", color: "bg-red-500", icon: AlertTriangle };
//     return { status: "Low", color: "bg-blue-500", icon: AlertTriangle };
//   };

//   const getGsrStatus = (value) => {
//     if (value >= 2 && value <= 10)
//       return { status: "Normal", color: "bg-green-500", icon: CheckCircle };
//     if (value > 10 && value <= 15)
//       return {
//         status: "Elevated",
//         color: "bg-yellow-500",
//         icon: AlertTriangle,
//       };
//     if (value > 15)
//       return { status: "High", color: "bg-red-500", icon: AlertTriangle };
//     return { status: "Low", color: "bg-blue-500", icon: AlertTriangle };
//   };

//   const getBioimpedanceStatus = (value) => {
//     if (value >= 400 && value <= 600)
//       return { status: "Normal", color: "bg-green-500", icon: CheckCircle };
//     if (value > 600 && value <= 800)
//       return {
//         status: "Elevated",
//         color: "bg-yellow-500",
//         icon: AlertTriangle,
//       };
//     if (value > 800)
//       return { status: "High", color: "bg-red-500", icon: AlertTriangle };
//     return { status: "Low", color: "bg-blue-500", icon: AlertTriangle };
//   };

//   // Get status objects
//   const hydrationStatus = getHydrationStatus(healthData.hydration);
//   const temperatureStatus = getTemperatureStatus(healthData.temperature);
//   const heartRateStatus = getHeartRateStatus(healthData.heartRate);
//   const gsrStatus = getGsrStatus(healthData.gsr);
//   const bioimpedanceStatus = getBioimpedanceStatus(healthData.bioimpedance);

//   // Health metrics data
//   const healthMetrics = [
//     {
//       id: "hydration",
//       name: "Hydration",
//       description: "Body water percentage",
//       value: `${healthData.hydration}%`,
//       icon: Droplets,
//       status: hydrationStatus,
//       category: "Body Composition",
//       normalRange: "50-70%",
//       trend: healthData.hydration > 65 ? "up" : "down",
//     },
//     {
//       id: "temperature",
//       name: "Temperature",
//       description: "Core temperature",
//       value: `${healthData.temperature}°C`,
//       icon: Thermometer,
//       status: temperatureStatus,
//       category: "Vital Signs",
//       normalRange: "36.0-37.5°C",
//       trend: healthData.temperature > 36.8 ? "up" : "down",
//     },
//     {
//       id: "heartRate",
//       name: "Heart Rate",
//       description: "Beats per minute",
//       value: `${healthData.heartRate} BPM`,
//       icon: Heart,
//       status: heartRateStatus,
//       category: "Vital Signs",
//       normalRange: "60-100 BPM",
//       trend: healthData.heartRate > 72 ? "up" : "down",
//     },
//     {
//       id: "gsr",
//       name: "GSR",
//       description: "Galvanic Skin Response",
//       value: `${healthData.gsr} μS`,
//       icon: Zap,
//       status: gsrStatus,
//       category: "Stress Levels",
//       normalRange: "2-10 μS",
//       trend: healthData.gsr > 5.2 ? "up" : "down",
//     },
//     {
//       id: "bioimpedance",
//       name: "Bioimpedance",
//       description: "Body composition",
//       value: `${healthData.bioimpedance} Ω`,
//       icon: Battery,
//       status: bioimpedanceStatus,
//       category: "Body Composition",
//       normalRange: "400-600 Ω",
//       trend: healthData.bioimpedance > 480 ? "up" : "down",
//     },
//   ];

//   // Get unique categories
//   const categories = [
//     ...new Set(healthMetrics.map((metric) => metric.category)),
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-8 md:mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
//                 Health Monitor Dashboard
//               </h1>
//               <p className="text-slate-600 mt-2 text-lg">
//                 Real-time health metrics tracking and analysis
//               </p>
//             </div>
//             <div>
//               <Button
//                 size="sm"
//                 className="text-white mr-4 bg-red-600 hover:bg-red-500"
//                 onClick={() => {
//                   localStorage.removeItem("token");
//                   window.location.reload();
//                 }}
//               >
//                 Logout
//               </Button>
//             </div>
//           </div>

//           {/* Loading and Error States */}
//           {loading && (
//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-blue-700 font-medium">Loading...</p>
//             </div>
//           )}
//           {error && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 font-medium">Error: {error}</p>
//             </div>
//           )}
//         </header>

//         {/* Category-wise Metric Groups */}
//         <div className="space-y-8 mb-12">
//           {categories.map((category) => {
//             const categoryMetrics = healthMetrics.filter(
//               (metric) => metric.category === category
//             );
//             const optimalCount = categoryMetrics.filter(
//               (m) =>
//                 m.status.status === "Normal" || m.status.status === "Optimal"
//             ).length;

//             return (
//               <Card
//                 key={category}
//                 className="shadow-lg border-0 bg-white/80 backdrop-blur-sm"
//               >
//                 <CardHeader className="pb-4 border-b border-slate-100">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                     <div>
//                       <CardTitle className="text-xl font-semibold text-slate-800">
//                         {category}
//                       </CardTitle>
//                       <CardDescription className="text-slate-600 mt-1">
//                         Health metrics in {category}
//                       </CardDescription>
//                     </div>
//                     <Badge
//                       variant="secondary"
//                       className={`${
//                         optimalCount === categoryMetrics.length
//                           ? "bg-green-100 text-green-800"
//                           : "bg-blue-100 text-blue-800"
//                       } px-3 py-1`}
//                     >
//                       {optimalCount} of {categoryMetrics.length} optimal
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {categoryMetrics.map((metric) => {
//                       const IconComponent = metric.icon;
//                       const TrendIcon =
//                         metric.trend === "up" ? TrendingUp : TrendingDown;
//                       const trendColor =
//                         metric.trend === "up"
//                           ? metric.status.color === "bg-red-500"
//                             ? "text-red-500"
//                             : "text-green-500"
//                           : metric.status.color === "bg-green-500"
//                           ? "text-green-500"
//                           : "text-red-500";

//                       return (
//                         <div
//                           key={metric.id}
//                           className="group relative bg-linear-to-br from-white to-slate-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
//                         >
//                           <div className="absolute top-4 right-4">
//                             <Badge
//                               className={`${metric.status.color} text-white shadow-sm`}
//                             >
//                               {metric.status.status}
//                             </Badge>
//                           </div>

//                           <div className="flex items-start gap-4 mb-4">
//                             <div
//                               className={`p-3 rounded-xl ${
//                                 metric.status.color === "bg-green-500"
//                                   ? "bg-green-100"
//                                   : metric.status.color === "bg-blue-500"
//                                   ? "bg-blue-100"
//                                   : metric.status.color === "bg-yellow-500"
//                                   ? "bg-yellow-100"
//                                   : "bg-red-100"
//                               }`}
//                             >
//                               <IconComponent
//                                 className={`h-6 w-6 ${
//                                   metric.status.color === "bg-green-500"
//                                     ? "text-green-600"
//                                     : metric.status.color === "bg-blue-500"
//                                     ? "text-blue-600"
//                                     : metric.status.color === "bg-yellow-500"
//                                     ? "text-yellow-600"
//                                     : "text-red-600"
//                                 }`}
//                               />
//                             </div>
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-slate-800 text-lg">
//                                 {metric.name}
//                               </h3>
//                               <p className="text-slate-600 text-sm mt-1">
//                                 {metric.description}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex items-end justify-between mt-6">
//                             <div>
//                               <div className="text-3xl font-bold text-slate-900">
//                                 {metric.value}
//                               </div>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <TrendIcon
//                                   className={`w-4 h-4 ${trendColor}`}
//                                 />
//                                 <span className="text-sm text-slate-600">
//                                   Normal: {metric.normalRange}
//                                 </span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="group-hover:bg-slate-50 transition-colors"
//                             >
//                               Details
//                             </Button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Health Summary */}
//         <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="pb-4 border-b border-slate-100">
//             <CardTitle className="text-xl font-semibold text-slate-800">
//               Health Summary
//             </CardTitle>
//             <CardDescription className="text-slate-600">
//               Overview of your current health status
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <div className="space-y-4">
//               {healthMetrics.map((metric) => {
//                 const TrendIcon =
//                   metric.trend === "up" ? TrendingUp : TrendingDown;
//                 const trendColor =
//                   metric.trend === "up"
//                     ? metric.status.color === "bg-red-500"
//                       ? "text-red-500"
//                       : "text-green-500"
//                     : metric.status.color === "bg-green-500"
//                     ? "text-green-500"
//                     : "text-red-500";

//                 return (
//                   <div
//                     key={metric.id}
//                     className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-4 h-4 rounded-full ${metric.status.color}`}
//                       ></div>
//                       <div>
//                         <span className="font-medium text-slate-800">
//                           {metric.name}
//                         </span>
//                         <p className="text-sm text-slate-600">
//                           {metric.description}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-2">
//                         <TrendIcon className={`w-4 h-4 ${trendColor}`} />
//                         <span className="text-lg font-semibold text-slate-800">
//                           {metric.value}
//                         </span>
//                       </div>
//                       <Badge className={`${metric.status.color} text-white`}>
//                         {metric.status.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

































































import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Thermometer,
  Heart,
  Zap,
  Battery,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Dashboard = () => {
  const [healthData, setHealthData] = useState({
    hydration: 0,
    temperature: 0,
    heartRate: 0,
    gsr: 0,
    bioimpedance: 0,
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from backend
  const fetchHealthData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/getData/693429901f7364e2c6ee76e9`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        const { data } = result;

        // Update state with backend data in a single update
        setHealthData({
          hydration: data.hydration,
          temperature: data.temperature,
          heartRate: data.heartRate,
          gsr: data.gsr,
          bioimpedance: data.bioimpedance,
        });
        setLastUpdate(new Date(data.timestamp));

        // Clear any previous errors
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch health data");
      console.error(err);
    } finally {
      // Only set loading to false on initial load
      if (loading) {
        setLoading(false);
      }
    }
  };

  // Fetch data on component mount and set up interval
  useEffect(() => {
    // Initial fetch
    fetchHealthData();

    // Set up interval to fetch data every 3 seconds
    const interval = setInterval(() => {
      fetchHealthData();
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to prevent re-creating interval

  // Health metrics data - removed normal range and status
  const healthMetrics = [
    {
      id: "hydration",
      name: "Hydration",
      description: "Body water percentage",
      value: `${healthData.hydration}%`,
      icon: Droplets,
      category: "Body Composition",
      trend: healthData.hydration > 65 ? "up" : "down",
    },
    {
      id: "temperature",
      name: "Temperature",
      description: "Core temperature",
      value: `${healthData.temperature}°C`,
      icon: Thermometer,
      category: "Vital Signs",
      trend: healthData.temperature > 36.8 ? "up" : "down",
    },
    {
      id: "heartRate",
      name: "Heart Rate",
      description: "Beats per minute",
      value: `${healthData.heartRate} BPM`,
      icon: Heart,
      category: "Vital Signs",
      trend: healthData.heartRate > 72 ? "up" : "down",
    },
    {
      id: "gsr",
      name: "GSR",
      description: "Galvanic Skin Response",
      value: `${healthData.gsr} μS`,
      icon: Zap,
      category: "Stress Levels",
      trend: healthData.gsr > 5.2 ? "up" : "down",
    },
    {
      id: "bioimpedance",
      name: "Bioimpedance",
      description: "Body composition",
      value: `${healthData.bioimpedance} Ω`,
      icon: Battery,
      category: "Body Composition",
      trend: healthData.bioimpedance > 480 ? "up" : "down",
    },
  ];

  // Get unique categories
  const categories = [
    ...new Set(healthMetrics.map((metric) => metric.category)),
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Health Monitor Dashboard
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Real-time health metrics tracking and analysis
              </p>
            </div>
            <div>
              <Button
                size="sm"
                className="text-white mr-4 bg-red-600 hover:bg-red-500"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 font-medium">Loading...</p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
          )}
        </header>

        {/* Category-wise Metric Groups */}
        <div className="space-y-8 mb-12">
          {categories.map((category) => {
            const categoryMetrics = healthMetrics.filter(
              (metric) => metric.category === category
            );

            return (
              <Card
                key={category}
                className="shadow-lg border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-800">
                        {category}
                      </CardTitle>
                      <CardDescription className="text-slate-600 mt-1">
                        Health metrics in {category}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 px-3 py-1"
                    >
                      {categoryMetrics.length} metrics
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryMetrics.map((metric) => {
                      const IconComponent = metric.icon;
                      const TrendIcon =
                        metric.trend === "up" ? TrendingUp : TrendingDown;
                      const trendColor =
                        metric.trend === "up" ? "text-green-500" : "text-red-500";

                      return (
                        <div
                          key={metric.id}
                          className="group relative bg-linear-to-br from-white to-slate-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-slate-100">
                              <IconComponent className="h-6 w-6 text-slate-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 text-lg">
                                {metric.name}
                              </h3>
                              <p className="text-slate-600 text-sm mt-1">
                                {metric.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-6">
                            <div>
                              <div className="text-3xl font-bold text-slate-900">
                                {metric.value}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="group-hover:bg-slate-50 transition-colors"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Health Summary */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-xl font-semibold text-slate-800">
              Health Summary
            </CardTitle>
            <CardDescription className="text-slate-600">
              Overview of your current health status
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {healthMetrics.map((metric) => {
                const TrendIcon =
                  metric.trend === "up" ? TrendingUp : TrendingDown;
                const trendColor =
                  metric.trend === "up" ? "text-green-500" : "text-red-500";

                return (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                      <div>
                        <span className="font-medium text-slate-800">
                          {metric.name}
                        </span>
                        <p className="text-sm text-slate-600">
                          {metric.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                        <span className="text-lg font-semibold text-slate-800">
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

