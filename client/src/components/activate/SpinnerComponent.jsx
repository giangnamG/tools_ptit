import React from 'react';
import { CircleSpinnerOverlay, FerrisWheelSpinner } from 'react-spinner-overlay';
import config from '../../config';

const SpinnerComponent = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999'
        }}>
            <FerrisWheelSpinner loading={true} size={28} />
            <CircleSpinnerOverlay
                loading={true}
                // overlayColor="rgba(0, 153, 255, 0.2)"
                overlayColor={config.app.styles.backgroundColor}
            />
        </div>
    );
}

export default SpinnerComponent;
