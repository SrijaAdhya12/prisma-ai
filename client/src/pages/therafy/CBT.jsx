import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoonIcon, SunIcon } from 'lucide-react';

// Simulated function to fetch exercises using Gemini
const fetchExercisesWithGemini = (mood) => {
  // In a real application, this would be an API call to Gemini
  return new Promise(resolve => {
    setTimeout(() => {
      const exercises = [
        { title: 'Thought Record', description: 'Write down negative thoughts and challenge them.' },
        { title: 'Behavioral Activation', description: 'Plan and engage in activities that bring joy and accomplishment.' },
        { title: 'Mindfulness Meditation', description: 'Practice being present in the moment without judgment.' },
      ];
      resolve(exercises);
    }, 1000);
  });
}

const CBTExercise = () => {
  const [mood, setMood] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (mood) {
      setLoading(true);
      fetchExercisesWithGemini(mood).then((fetchedExercises) => {
        setExercises(fetchedExercises);
        setLoading(false);
      });
    }
  }, [mood]);

  

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>CBT Exercise Suggester</CardTitle>
          </div>
          <CardDescription>Select your current mood to get personalized CBT exercises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={(value) => setMood(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxious">Anxious</SelectItem>
                <SelectItem value="depressed">Depressed</SelectItem>
                <SelectItem value="angry">Angry</SelectItem>
                <SelectItem value="stressed">Stressed</SelectItem>
              </SelectContent>
            </Select>
            
            {loading && <p className="text-center">Loading exercises...</p>}
            
            {!loading && exercises.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Suggested Exercises:</h3>
                {exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{exercise.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{exercise.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CBTExercise
