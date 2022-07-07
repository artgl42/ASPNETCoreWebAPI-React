import { useReducerContext } from './hooks/useReducerContext';

export default function DataView() {
  const { view } = useReducerContext();

  return (
    view.dataView
  );
}
