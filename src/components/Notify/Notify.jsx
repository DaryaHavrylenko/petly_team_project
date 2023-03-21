import Backdrop from 'components/UIKit/Backdrop';
import { useModal } from 'hooks/useModal';
import { useViewportResize } from 'hooks/useViewportResize';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import ArrowIcon from './ArrowIcon';
import { Card, Wrapper } from './Notify.styled';

const modalRoot = document.querySelector('#modal-root');

const Notify = ({ onClose, position: parentPosition, children }) => {
  // Close Modal hook
  const { onBackdropClick } = useModal(onClose);

  //CARD POSITION
  const [cardPosition, setCardPosition] = useState();
  const viewportSize = useViewportResize();
  const cardRef = useRef();
  useEffect(() => {
    const cardPosition = cardRef.current.getBoundingClientRect();
    setCardPosition(cardPosition);
  }, [viewportSize]);
  //CARD POSITION

  //-------------------------------

  //PARENT POSITION
  const {
    top: parentTop,
    left: parentLeft,
    width: parentWidth,
    height: parentHeight,
  } = parentPosition;

  const parentCenter = {
    x: parentLeft + parentWidth / 2,
    y: parentTop + parentHeight / 2,
  };

  const parentLocation = {
    ...parentCenter,
    hor: parentCenter.x <= window.innerWidth / 2 ? 'left' : 'right',
    ver: parentCenter.y <= window.innerHeight / 2 ? 'top' : 'bottom',
  };

  const frequentStyles = {
    left: `${parentLocation.x}px`,
    top: `${parentLocation.y}px`,
    transformX: `${parentLocation.hor === 'right' ? '-100%' : 0}`,
    transformY: `${parentLocation.ver === 'bottom' ? '-100%' : 0}`,
    borderTL: `${
      parentLocation.ver === 'top' && parentLocation.hor === 'left' ? 0 : '20px'
    }`,
    borderTR: `${
      parentLocation.ver === 'top' && parentLocation.hor === 'right'
        ? 0
        : '20px'
    }`,
    borderBR: `${
      parentLocation.ver === 'bottom' && parentLocation.hor === 'right'
        ? 0
        : '20px'
    }`,
    borderBL: `${
      parentLocation.ver === 'bottom' && parentLocation.hor === 'left'
        ? 0
        : '20px'
    }`,
  };

  console.log(frequentStyles);
  //PARENT POSITION

  // console.log(cardPosition);

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      {/* <ArrowIcon /> */}
      <Card ref={cardRef} freqProps={frequentStyles} loc={parentLocation}>
        <Wrapper>{children}</Wrapper>
      </Card>
    </Backdrop>,
    modalRoot
  );
};

export default Notify;
