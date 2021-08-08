import React from 'react'
import { useMatrixContext } from "../contexts/MatrixContext";
import { Button, Icon, Modal, Image } from 'semantic-ui-react'
import * as constants from "../utils/cellConstants"

const ModalExampleScrollingContent = () => {
  const {tutorialOpen, handleTutorialModal} = useMatrixContext();

  return (
    <Modal
      open={tutorialOpen}
      onClose={() => handleTutorialModal(false)}
      onOpen={() => handleTutorialModal(true)}
      trigger={<button >Tutorial</button>}
    >
      <Modal.Header>Tutorial</Modal.Header>
      <Modal.Content  scrolling>
        <Modal.Description>
          <div>
          
          <h3>Start & End </h3>
          <div>
          <Image src={constants.START_IMG} size="mini" />
          <p>Start</p>
          </div>

          <div>
          <Image src={constants.END_IMG} size="mini" />
          <p>End</p>
          </div>

        
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleTutorialModal(false)} primary>
          Proceed <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleScrollingContent