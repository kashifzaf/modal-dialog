export interface IModalProps {
  /**
   * Modal Header
   */
  header?: JSX.Element | string;
  /**
   * Modal Contents
   */
  children?: JSX.Element | string;
  /**
   * Close event
   */
  onClose: () => void;
}
