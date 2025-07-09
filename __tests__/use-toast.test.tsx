import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

describe('useToast', () => {
  it('should add a toast and dismiss it', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Test Toast', description: 'Toast description' });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
    expect(result.current.toasts[0].description).toBe('Toast description');
    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should remove a toast after dismiss and timeout', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Remove Toast' });
    });
    expect(result.current.toasts.length).toBe(1);
    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current.toasts.length).toBe(0);
    jest.useRealTimers();
  });

  it('should handle multiple toasts and show only the last one if only one is allowed', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
    });
    
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Toast 2');
    jest.useRealTimers();
  });

  it('should be safe to dismiss a toast multiple times', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Toast' });
    });
    const id = result.current.toasts[0].id;
    act(() => {
      result.current.dismiss(id);
      result.current.dismiss(id);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });
}); 