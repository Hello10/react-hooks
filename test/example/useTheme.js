import {useSingleton} from '../../dist';

class Theme extends useSingleton.Singleton {
  initialize () {
    return {
      mode: 'light',
      primary: '#000000'
    };
  }

  toggleMode = ()=> {
    const {mode} = this.state;
    const new_mode = mode === 'light' ? 'dark' : 'light';
    this.setState({mode: new_mode});
  };

  set primary (primary) {
    this.setState({primary});
  }

  get primary () {
    return this.state.primary;
  }

  get mode () {
    return this.state.mode;
  }

  isDark () {
    return (this.state.mode === 'dark');
  }

  isLight () {
    return (this.state.mode === 'light');
  }
}

export default function useTheme () {
  return useSingleton(Theme);
}
