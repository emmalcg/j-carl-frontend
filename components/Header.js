import NavItem from './NavItem';

export default function Header() {
  //const linkItems = [
  //  {title: 'Home', link:'/rfq'},
  //  {title: 'Statement', link:'/rfq-statment'},
  //  {title: 'Images', link:'/rfq-work'},
  //  {title: 'Team', link:'/rfq-team'}
  //]
  //console.log(linkItems)
  return (
    <Header>
      <div>
        <h1 className="text-1xl font-bold underline">James Carl Studio | <span>RFQ</span></h1>
      </div>
      <nav>
        <ul>
          {/*{linkItems.map(item => <NavItem key={item.title} title={item.title} link={item.link}/>)}*/}
        </ul>
      </nav>

    </Header>
  )
}
