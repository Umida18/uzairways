import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Send, PlusCircle, MessageCircle } from "lucide-react";
import api from "../../../api/api";
import { Form, Layout, notification } from "antd";
import HeaderMain from "@/components/headerMain";
import { FooterMain } from "@/components/footer";

interface Question {
  id: string;
  question: string;
  answer?: string;
}

const { Content } = Layout;

export default function Question() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // checkAdminStatus();
    fetchQuestions();
    adminMode();
  }, []);

  const adminMode = () => {
    const role = localStorage.getItem("userRole");
    if (role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const { data } = await api.get<Question[]>(
        "/question/answer/get-all-questions-wtih-answer"
      );
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      notification.error({
        message: "Failed to fetch questions",
      });
    }
  };
  const handleCreateQuestion = useCallback(
    async (values: { question: string }) => {
      try {
        const { data } = await api.post<Question>(
          "/question/answer/create-question",
          values
        );
        setQuestions((prevQuestions) => [...prevQuestions, data]);
        form.resetFields();
        notification.success({
          message: "Question created successfully",
        });
      } catch (error) {
        console.error("Error creating question:", error);
        notification.error({
          message: "Failed to create question",
        });
      }
    },
    [form]
  );

  const handleAnswerQuestion = useCallback(
    async (questionId: string) => {
      if (!isAdmin) {
        notification.error({
          message: "Only administrators can answer questions",
        });
        return;
      }

      const answer = answerText[questionId];
      if (!answer?.trim()) return;

      try {
        const { data } = await api.put<Question>(
          `/question/answer/answer-to-question/${questionId}`,
          {
            answer,
          }
        );
        setAnswerText((prev) => ({ ...prev, [questionId]: "" }));
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q.id === questionId ? data : q))
        );
        notification.success({
          message: "Answer submitted successfully",
        });
      } catch (error) {
        console.error("Error answering question:", error);
        notification.error({
          message: "Failed to submit answer",
        });
      }
    },
    [answerText, isAdmin]
  );

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      if (!isAdmin) {
        notification.error({
          message: "Only administrators can delete questions",
        });
        return;
      }

      try {
        await api.delete(`/question/answer/delete-question/${questionId}`);
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== questionId)
        );
        notification.success({
          message: "Question deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting question:", error);
        notification.error({
          message: "Failed to delete question",
        });
      }
    },
    [isAdmin]
  );

  return (
    <Layout>
      <HeaderMain />
      <Content>
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Questions And Answers
              {isAdmin && (
                <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full ml-2">
                  Admin Mode
                </span>
              )}
            </h1>

            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-700">
                  Ask a Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form onFinish={handleCreateQuestion} form={form}>
                  <div className="flex flex-col gap-4">
                    <Form.Item
                      name="question"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: "Please input your question!",
                        },
                      ]}
                    >
                      <Textarea
                        placeholder="What would you like to know?"
                        className="w-full resize-none"
                        rows={3}
                      />
                    </Form.Item>
                    <Button type="submit" className="self-end">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Ask Question
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
                      {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {question.answer ? (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">{question.answer}</p>
                      </div>
                    ) : isAdmin ? (
                      <div className="flex gap-2">
                        <Input
                          value={answerText[question.id] || ""}
                          onChange={(e) =>
                            setAnswerText((prev) => ({
                              ...prev,
                              [question.id]: e.target.value,
                            }))
                          }
                          placeholder="Write an answer..."
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleAnswerQuestion(question.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Submit Answer</span>
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Not answered yet</p>
                    )}

                    {isAdmin && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Question
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Content>
      <FooterMain />
    </Layout>
  );
}
