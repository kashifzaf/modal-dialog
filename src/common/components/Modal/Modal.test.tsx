import { render } from '@testing-library/react';
import Modal from './Modal';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Modal', () => {
 
  it('should render modal with close buttons and content', () => {
    const onClose = jest.fn();
    const headerText = 'Modal Header';
    const contentText = 'Modal Content';

    render(
      <Modal onClose={onClose} header={headerText}>
        {contentText}
      </Modal>
    );

    expect(screen.getByLabelText('Exit Modal')).toBeInTheDocument();
    expect(screen.getByLabelText('Close Modal')).toBeInTheDocument();
    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = jest.fn();

    render(<Modal onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close Modal'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the cross button is clicked', () => {
    const onClose = jest.fn();

    render(<Modal onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Exit Modal'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', () => {
    const onClose = jest.fn();

    render(<Modal onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    render(<Modal onClose={onClose} />);
    const modalWrapper = screen.getByLabelText('Modal Dialog');

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.mouseDown(modalWrapper);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should have accessibility attributes', () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose} header="Modal Header">
        Modal Content
      </Modal>
    );

    const modalWrapper = screen.getByRole('dialog');
    const crossCloseButton = screen.getByLabelText('Exit Modal');
    const closeButton = screen.getByLabelText('Close Modal');
    const modalContent = screen.getByText('Modal Content');

    expect(modalWrapper).toHaveAttribute('aria-modal', 'true');
    expect(modalWrapper).toHaveAttribute('aria-label', 'Modal Dialog');
    expect(modalContent).toHaveAttribute('aria-label', 'Modal Content');
    expect(crossCloseButton).toHaveAttribute('aria-label', 'Exit Modal');
    expect(closeButton).toHaveAttribute('aria-label', 'Close Modal');
  });

  it('should focus on the modal when opened', () => {
    const onClose = jest.fn();
    render(<Modal onClose={onClose} />);

    const modalWrapper = screen.getByRole('dialog');
    expect(modalWrapper).toHaveFocus();
  });

  
  it('should trap focus within the modal when opened', () => {
    const onClose = jest.fn();
    render(<Modal onClose={onClose} />);

    const crossCloseButton = screen.getByLabelText('Exit Modal');
    const closeButton = screen.getByLabelText('Close Modal');

    fireEvent.keyDown(closeButton, { key: 'Tab' });
    expect(crossCloseButton).toHaveFocus();

    fireEvent.keyDown(crossCloseButton, { key: 'Tab', shiftKey: true });
    expect(closeButton).toHaveFocus();
  });

});
