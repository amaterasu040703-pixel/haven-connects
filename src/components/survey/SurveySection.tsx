import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface SurveyQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'textarea' | 'text' | 'number';
  question: string;
  description?: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  value?: any;
}

interface SurveySectionProps {
  title: string;
  description: string;
  questions: SurveyQuestion[];
  values: Record<string, any>;
  onChange: (questionId: string, value: any) => void;
}

export function SurveySection({ title, description, questions, values, onChange }: SurveySectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                {question.question}
                {question.required && <span className="text-destructive">*</span>}
              </CardTitle>
              {question.description && (
                <CardDescription>{question.description}</CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={values[question.id] || ""}
                  onValueChange={(value) => onChange(question.id, value)}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                      <Label htmlFor={`${question.id}-${index}`} className="font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === 'checkbox' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}-${index}`}
                        checked={(values[question.id] || []).includes(option)}
                        onCheckedChange={(checked) => {
                          const currentValues = values[question.id] || [];
                          const newValues = checked
                            ? [...currentValues, option]
                            : currentValues.filter((v: string) => v !== option);
                          onChange(question.id, newValues);
                        }}
                      />
                      <Label htmlFor={`${question.id}-${index}`} className="font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'textarea' && (
                <Textarea
                  placeholder={question.placeholder}
                  value={values[question.id] || ""}
                  onChange={(e) => onChange(question.id, e.target.value)}
                  className="min-h-[100px]"
                />
              )}
              
              {question.type === 'text' && (
                <Input
                  type="text"
                  placeholder={question.placeholder}
                  value={values[question.id] || ""}
                  onChange={(e) => onChange(question.id, e.target.value)}
                />
              )}
              
              {question.type === 'number' && (
                <Input
                  type="number"
                  placeholder={question.placeholder}
                  value={values[question.id] || ""}
                  onChange={(e) => onChange(question.id, parseInt(e.target.value) || "")}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}