export interface Todo {
  _id: string;
  title: string;
  description: string;
  start: string;
  due: string;
  tag: string;
  userId: string;
  isCompleted: boolean;
  progress: boolean;
}
