import { Typography } from "antd";
import { StarIcon, EyeIcon, CheckCircleIcon } from "lucide-react";

const { Title, Text } = Typography;

const sampleData = [
  {
    title: "Our Mission",
    description:
      "To provide the best car services in the industry with a focus on customer satisfaction and innovation.",
    icon: StarIcon,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-200",
  },
  {
    title: "Our Vision",
    description:
      "To be the leading car service provider globally, known for our quality and reliability.",
    icon: EyeIcon,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-500",
    borderColor: "border-teal-200",
  },
  {
    title: "Our Values",
    description: "Integrity, Excellence, and Customer Focus.",
    icon: CheckCircleIcon,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-500",
    borderColor: "border-indigo-200",
  },
];

const About = () => {
  return (
    <div className="min-h-[80vh] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-8 text-center">
            <h2 className="text-white mb-0 text-3xl font-bold">
              About Our Company
            </h2>
            <Text className="text-gray-300 mt-2 block text-base">
              Driving excellence, delivering exceptional service
            </Text>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {sampleData.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} ${item.borderColor} border-2 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <div className="flex justify-center mb-4">
                    <item.icon
                      className={`w-16 h-16 ${item.iconColor} opacity-80`}
                    />
                  </div>
                  <Title level={4} className="mb-3 text-gray-800">
                    {item.title}
                  </Title>
                  <Text className="text-gray-600 block">
                    {item.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
