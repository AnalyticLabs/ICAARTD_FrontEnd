import {
  FileText,
  Presentation,
  ClipboardList,
  CloudUpload,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    Icon: FileText,
    title: "Submission Guidelines",
    description:
      "Learn how to format and prepare your manuscript before submission.",
    path: "/guidelines",
  },
  {
    Icon: ClipboardList,
    title: "Review Process",
    description: "Understand the peer-review process and evaluation criteria.",
    path: "/review-process",
  },
  {
    Icon: CloudUpload,
    title: "Submit Your Paper",
    description:
      "Upload your manuscript and track its status through our platform.",
    path: "/submit-paper",
  },
  {
    Icon: Presentation,
    title: "Presentation Guidelines",
    description:
      "Instructions for presenting accepted papers at the conference.",
    path: "/presentation",
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-8">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} index={idx} />
      ))}
    </div>
  );
}
