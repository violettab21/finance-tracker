import { useMemo } from 'react';
import { StyledFlexWrapper } from '../../styled/flex';
import { StyledComplexityBox, StyledComplexityText } from './styles';
import { useTheme } from 'styled-components';

export const PasswordComplexity = ({ password }: { password: string }) => {
  const theme = useTheme();
  const calculatePasswordComplexity = (password: string) => {
    let complexity = 0;
    if (password.length >= 8) {
      complexity += 1;
    }
    if (password.match(/[a-z]/)) {
      complexity += 1;
    }
    if (password.match(/[0-9]/)) {
      complexity += 1;
    }
    if (password.match(/[A-Z]/)) {
      complexity += 1;
    }

    if (password.match(/[\W_]/)) {
      complexity += 1;
    }
    return complexity;
  };

  const complexity = useMemo(
    () => calculatePasswordComplexity(password),
    [password]
  );

  const getComplexityDetails = (complexity: number) => {
    let text, color;
    switch (complexity) {
      case 1: {
        text = 'Weak';
        color = theme.colors.PasswordComplexityColors.weak;
        break;
      }

      case 2: {
        text = 'Below Average';
        color = theme.colors.PasswordComplexityColors.belowAverage;
        break;
      }

      case 3: {
        text = 'Medium';
        color = theme.colors.PasswordComplexityColors.medium;
        break;
      }
      case 4: {
        text = 'Good';
        color = theme.colors.PasswordComplexityColors.good;
        break;
      }
      case 5: {
        text = 'Strong';
        color = theme.colors.PasswordComplexityColors.strong;
        break;
      }
      default: {
        text = 'Weak';
        color = theme.colors.PasswordComplexityColors.weak;
        break;
      }
    }
    return { text, color };
  };

  const complexityValue = getComplexityDetails(complexity);

  const getArray = (): number[] => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      array.push(i);
    }
    return array;
  };

  return (
    <StyledFlexWrapper
      direction="column"
      gap={'5px'}
      align={'flex-end'}
      justify="space-between"
    >
      <StyledFlexWrapper gap={'2px'} width="100%">
        {getArray().map((element) => {
          const isFilled = element + 1 <= complexity;

          return (
            <StyledComplexityBox
              key={element}
              $indicatorColor={complexityValue.color}
              $isFilled={isFilled}
            />
          );
        })}
      </StyledFlexWrapper>
      <StyledComplexityText>{complexityValue.text}</StyledComplexityText>
    </StyledFlexWrapper>
  );
};
