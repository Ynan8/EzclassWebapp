import React, { useState } from 'react'
import WorkSpace from '../../components/WorkSpace/WorkSpace'
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';


const Editor = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div>
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
          <Confetti />
        </div>
      )}
      <WorkSpace id={id}  showConfetti={showConfetti} setShowConfetti={setShowConfetti}  />
    </div>

  )
}

export default Editor