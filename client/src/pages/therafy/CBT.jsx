import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SmilePlus, Frown, Meh, ThumbsUp, Brain, HeartHandshake, CheckCircle2 } from "lucide-react"

const moodExercises = {
  happy: [
    {
      title: "Gratitude Journal",
      description: "Cultivate a positive mindset by focusing on things you're grateful for.",
      steps: [
        "Find a quiet, comfortable space",
        "Reflect on your day or recent experiences",
        "Write down three things you're genuinely grateful for",
        "Describe why you're grateful for each item",
        "Take a moment to feel the positive emotions associated with gratitude"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/gratitude-journal.jpg"
    },
    {
      title: "Positive Affirmations",
      description: "Reinforce positive thoughts and beliefs to maintain and enhance your good mood.",
      steps: [
        "Choose 3-5 positive statements about yourself",
        "Stand in front of a mirror",
        "Look yourself in the eye and say each affirmation out loud",
        "Repeat each affirmation 3-5 times",
        "Notice how you feel after the exercise"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/positive-affirmations.jpg"
    },
    {
      title: "Mindful Appreciation",
      description: "Practice mindfulness to fully appreciate the positive aspects of your surroundings.",
      steps: [
        "Choose a location for a short walk (indoors or outdoors)",
        "As you walk, focus on your senses - what you see, hear, smell, and feel",
        "Identify 5 things you appreciate in your environment",
        "For each thing, pause and fully acknowledge its positive qualities",
        "Reflect on how this exercise affects your mood"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/mindful-appreciation.jpg"
    }
  ],
  sad: [
    {
      title: "Thought Challenge",
      description: "Identify and challenge negative thoughts to improve your mood.",
      steps: [
        "Identify a negative thought you're experiencing",
        "Write down evidence that supports this thought",
        "Write down evidence that contradicts this thought",
        "Create a more balanced, realistic thought",
        "Reflect on how this new perspective affects your mood"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/thought-challenge.jpg"
    },
    {
      title: "Pleasant Activity Scheduling",
      description: "Plan and engage in activities that typically bring you joy to improve your mood.",
      steps: [
        "Make a list of activities you usually enjoy",
        "Choose one activity from your list",
        "Schedule a specific time to do this activity today",
        "Engage in the activity, focusing on the present moment",
        "After the activity, note how it affected your mood"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/pleasant-activity.jpg"
    },
    {
      title: "Self-Compassion Exercise",
      description: "Practice self-compassion to counter negative self-talk and improve your mood.",
      steps: [
        "Identify a situation that's causing you distress",
        "Acknowledge that suffering is a part of the human experience",
        "Write a letter to yourself from the perspective of a compassionate friend",
        "Read the letter aloud to yourself",
        "Reflect on how showing yourself kindness affects your mood"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/self-compassion.jpg"
    }
  ],
  neutral: [
    {
      title: "Mindfulness Meditation",
      description: "Practice a short mindfulness meditation to center yourself and improve awareness.",
      steps: [
        "Find a quiet, comfortable place to sit",
        "Set a timer for 5-10 minutes",
        "Close your eyes and focus on your breath",
        "When your mind wanders, gently bring your attention back to your breath",
        "After the timer ends, slowly open your eyes and notice how you feel"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/mindfulness-meditation.jpg"
    },
    {
      title: "Goal Setting",
      description: "Set small, achievable goals for the day to create a sense of purpose and accomplishment.",
      steps: [
        "Reflect on what you'd like to achieve today",
        "Write down 2-3 small, specific, and achievable goals",
        "Break down each goal into actionable steps",
        "Prioritize your goals and allocate time for each",
        "At the end of the day, review your progress and celebrate your achievements"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/goal-setting.jpg"
    },
    {
      title: "Cognitive Restructuring",
      description: "Examine your thoughts and reframe them in a more balanced way to improve your perspective.",
      steps: [
        "Identify a situation that's causing you stress or anxiety",
        "Write down your automatic thoughts about the situation",
        "Identify any cognitive distortions in these thoughts",
        "Create alternative, more balanced thoughts",
        "Reflect on how these new thoughts affect your emotions and behavior"
      ],
      image: "https://kcqfxhgxgxhxjjxjkwuc.supabase.co/storage/v1/object/public/images/cognitive-restructuring.jpg"
    }
  ]
}

function EnhancedCBTExerciseSuggester() {
  const [mood, setMood] = useState(null)

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-screen bg-background text-foreground">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">CBT Exercise Suggester</CardTitle>
          <CardDescription className="text-center text-lg">Select your current mood to get personalized CBT exercises</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup onValueChange={(value) => setMood(value)} className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="happy" id="happy" />
              <Label htmlFor="happy" className="flex items-center space-x-2 cursor-pointer">
                <SmilePlus className="h-6 w-6 text-green-500" />
                <span>Happy</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sad" id="sad" />
              <Label htmlFor="sad" className="flex items-center space-x-2 cursor-pointer">
                <Frown className="h-6 w-6 text-blue-500" />
                <span>Sad</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral" className="flex items-center space-x-2 cursor-pointer">
                <Meh className="h-6 w-6 text-yellow-500" />
                <span>Neutral</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {mood && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Suggested CBT Exercises for {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              {moodExercises[mood].map((exercise, index) => (
                <Card key={index} className="mb-8 overflow-hidden">
                  <div className="relative h-48">
                    <img src={exercise.image} alt={exercise.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white">{exercise.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-4 text-muted-foreground">{exercise.description}</p>
                    <h4 className="text-xl font-semibold mb-2">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {exercise.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {mood && (
        <div className="mt-8 text-center">
          <Button onClick={() => setMood(null)} className="bg-primary text-primary-foreground hover:bg-primary/90">Reset Mood</Button>
        </div>
      )}
    </div>
  )
}

export default EnhancedCBTExerciseSuggester
