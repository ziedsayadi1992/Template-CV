import { useLanguage } from "../../contexts/LanguageContext";

interface TipsCardProps {
  tipTitleKey: string;
  tips: [string, string, string, string];
}

function TipsCard({ tipTitleKey, tips }: TipsCardProps) {

    const { t } = useLanguage();

    return (
    <div className="bg-blue-50 border-l-4 border-green-500 p-4 rounded-r-xl">
      <div className="flex gap-3">
        <span className="text-green-600 text-xl">💡</span>
        <div>
          <p className="text-sm text-green-900 font-medium mb-1">
            {t(tipTitleKey)}
          </p>
          <ul className="text-xs text-green-800 space-y-1">
            {tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TipsCard;
