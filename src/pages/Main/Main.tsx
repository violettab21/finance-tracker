import { useNavigate } from 'react-router';
import {
  EXPENSES_ROUTE,
  PLANS_ROUTE,
  SAVINGS_ROUTE,
} from '../../routes/routes';
import { StyledFlexWrapper } from '../../styled/flex';
import MainImageBlock from './parts/MainImageBlock';
import bgImage from '../../assets/money-bag.png';
import planningImage from '../../assets/planning.png';
import charts from '../../assets/charts.png';
import calculator from '../../assets/calculator.png';
import { StyledMainPageWrapper, StyledMainSectionWrapper } from './styles';
import Button from '../../components/Button/Button';

export default function Main() {
  const navigate = useNavigate();
  return (
    <StyledMainPageWrapper>
      <StyledMainSectionWrapper justify="center">
        <StyledFlexWrapper
          direction="column"
          justify="center"
          align="center"
          width="50%"
          gap={'1rem'}
        >
          <h1>FinTrack: Simplify Your Financial Life</h1>
          <p>
            Take control of your finances with FinTrack, the ultimate app for
            tracking your expenses and income. Whether you’re budgeting for
            personal use, saving for big goals, or just gaining insight into
            your spending habits, FinTrack makes it simple and stress-free.
          </p>
          <Button secondary>Start right now</Button>
        </StyledFlexWrapper>
      </StyledMainSectionWrapper>

      <MainImageBlock
        image={calculator}
        header="Track Income and Expenses"
        description="Add and categorize all your financial transactions to see where your money goes."
        buttonCallback={() => navigate(EXPENSES_ROUTE)}
        buttonText="Start manage expenses"
      />

      <MainImageBlock
        image={planningImage}
        header="Plan Your Expenses"
        description="Set spending goals and plan ahead to stay within your budget."
        buttonCallback={() => navigate(PLANS_ROUTE)}
        buttonText="Start plan expenses"
      />

      <MainImageBlock
        image={charts}
        header="Visualize Your Finances"
        description="View clear and intuitive charts to track spending, planned trends, and financial progress."
        buttonCallback={() => navigate(PLANS_ROUTE)}
        buttonText="Check Overview"
      />

      <MainImageBlock
        image={bgImage}
        header="Monitor Your Savings"
        description=" Keep an eye on how much money you’ve saved each month and stay motivated."
        buttonCallback={() => navigate(SAVINGS_ROUTE)}
        buttonText="Check Saved Money"
      />
    </StyledMainPageWrapper>
  );
}
