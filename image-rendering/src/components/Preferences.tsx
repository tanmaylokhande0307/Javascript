import { memo, useCallback, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { LazyImage } from "./LazyImage";

interface DialogOption {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

const ageOptions: DialogOption[] = [
  {
    id: "kids",
    title: "Kids",
    icon: "preference_assets/adults.jpeg",
    description: "Content suitable for children",
  },
  {
    id: "teens",
    title: "Teens",
    icon: "preference_assets/kids.jpeg",
    description: "Content for teenagers",
  },
  {
    id: "adults",
    title: "Adults",
    icon: "preference_assets/teens.jpeg",
    description: "Content for adults",
  },
];

const genreOptions: DialogOption[] = [
  {
    id: "educational",
    title: "Educational",
    icon: "preference_assets/edu.jpeg",
    description: "Learning and education",
  },
  {
    id: "entertainment",
    title: "Anime",
    icon: "preference_assets/anime.jpeg",
    description: "Fun and entertainment",
  },
  {
    id: "documentary",
    title: "Documentary",
    icon: "preference_assets/documentary.jpeg",
    description: "Real-life stories",
  },
];

const narrationOptions: DialogOption[] = [
  {
    id: "professional",
    title: "Professional",
    icon: "preference_assets/professional.jpeg",
    description: "Clear and formal",
  },
  {
    id: "casual",
    title: "Casual",
    icon: "preference_assets/casual.jpeg",
    description: "Friendly and relaxed",
  },
  {
    id: "dramatic",
    title: "Dramatic",
    icon: "preference_assets/dramatic.jpeg",
    description: "Engaging and dynamic",
  },
];

const topicOptions: DialogOption[] = [
  {
    id: "science",
    title: "Science",
    icon: "preference_assets/science.jpeg",
    description: "Scientific discoveries",
  },
  {
    id: "history",
    title: "History",
    icon: "preference_assets/history.jpeg",
    description: "Historical events",
  },
  {
    id: "technology",
    title: "Technology",
    icon: "preference_assets/tech.jpeg",
    description: "Tech innovations",
  },
  {
    id: "nature",
    title: "Nature",
    icon: "preference_assets/nature.jpeg",
    description: "Natural world",
  },
];

const DialogBox = memo(
  ({
    title,
    options,
    selected,
    onSelect,
    multiple = false,
  }: {
    title: string;
    options: DialogOption[];
    selected: string | string[];
    onSelect: (value: string) => void;
    multiple?: boolean;
  }) => (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="w-full max-w-sm bg-secondary p-6 rounded-xl shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4 text-center text-purple-400">
        {title}
      </h3>
      <div className="grid gap-4">
        {options.map((option) => (
          <Tilt
            key={option.id}
            options={{
              max: 25,
              scale: 1.05,
              speed: 300,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300
                ${
                  multiple
                    ? (selected as string[]).includes(option.id)
                      ? "bg-purple-600 ring-2 ring-purple-400"
                      : "bg-gray-700 hover:bg-gray-600"
                    : selected === option.id
                    ? "bg-purple-600 ring-2 ring-purple-400"
                    : "bg-gray-700 hover:bg-gray-600"
                }
              `}
              onClick={() => onSelect(option.id)}
            >
              <div className="flex items-center space-x-4">
                <LazyImage
                  src={option.icon}
                  alt={option.title}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold">{option.title}</h4>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </motion.div>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.selected === nextProps.selected &&
      prevProps.options === nextProps.options
    );
  }
);

const Preferences = memo(() => {
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedNarration, setSelectedNarration] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleAgeSelect = useCallback((age: string) => {
    setSelectedAge(age);
  }, []);

  const handleGenreSelect = useCallback((genre: string) => {
    setSelectedGenre(genre);
  }, []);

  const handleNarrationSelect = useCallback((narration: string) => {
    setSelectedNarration(narration);
  }, []);

  const handleTopicSelect = useCallback((topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DialogBox
        title="Select Age Group"
        options={ageOptions}
        selected={selectedAge}
        onSelect={handleAgeSelect}
      />
      <DialogBox
        title="Choose Genre"
        options={genreOptions}
        selected={selectedGenre}
        onSelect={handleGenreSelect}
      />
      <DialogBox
        title="Narration Style"
        options={narrationOptions}
        selected={selectedNarration}
        onSelect={handleNarrationSelect}
      />
      <DialogBox
        title="Favorite Topics"
        options={topicOptions}
        selected={selectedTopics}
        onSelect={handleTopicSelect}
        multiple
      />
    </div>
  );
});

export default Preferences;
