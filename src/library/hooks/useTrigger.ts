import { useState } from 'react';

export default function useTrigger() {
  const [trigger, setTrigger] = useState<boolean>(false);

  const pullTrigger = () => {
    setTrigger(!trigger);
  };

  return { trigger, setTrigger, pullTrigger };
}
