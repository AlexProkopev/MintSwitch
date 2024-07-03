import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import BackButton from '../../components/BackButton/BackButton';

const AMLPolicy = () => {
  return (
    <Box 
      sx={{
        padding: 2,
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Темный прозрачный фон
        color: 'white', // Белый текст на темном фоне
        borderRadius: 2,
        boxShadow: 3,
        '@media (max-width: 768px)': {
          padding: 1,  // Меньше отступы для мобильных устройств
        },
      }}
    >
      <BackButton/>
      <Typography variant="h4" gutterBottom align="center">
        Политика по противодействию легализации доходов и финансированию терроризма (AML) на MintSwitch
      </Typography>

      <Typography variant="h5" gutterBottom>
        1. Основные принципы AML
      </Typography>
      <Typography variant="body1" paragraph>
        Сайт MintSwitch придерживается практик и мер в области противодействия легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма (AML).
      </Typography>

      <Typography variant="h5" gutterBottom>
        2. Цель мер по AML
      </Typography>
      <Typography variant="body1" paragraph>
        Целью данных мер является демонстрация того, что MintSwitch относится серьёзно к любым попыткам использовать свой сервис в незаконных целях.
      </Typography>

      <Typography variant="h5" gutterBottom>
        3. Предостережения для пользователей
      </Typography>
      <Typography variant="body1" paragraph>
        Предостерегаем пользователей от попыток использования нашего сервиса для легализации денежных средств, полученных преступным путём, финансирования терроризма, мошенничества любого рода, а также от использования сервиса для покупки запрещённых товаров и услуг.
      </Typography>

      <Typography variant="h5" gutterBottom>
        4. Требования к Заявкам
      </Typography>
      <Typography variant="body1" paragraph>
        Для предотвращения операций незаконного характера Сервис устанавливает определенные требования ко всем Заявкам, создаваемым Пользователем:
      </Typography>
      <Typography variant="body1" paragraph>
        4.1. Отправителем и получателем Платежа по Заявке должно быть одно и то же лицо. С использованием услуг Сервиса категорически запрещены переводы в пользу третьих лиц.
      </Typography>
      <Typography variant="body1" paragraph>
        4.2. Все контактные данные, заносимые Пользователем в Заявку, а также иные персональные данные, передаваемые Пользователем Сервису, должны быть актуальными и полностью достоверными.
      </Typography>
      <Typography variant="body1" paragraph>
        4.3. Категорически запрещено создание Заявок Пользователем с использованием анонимных прокси-серверов или каких-либо других анонимных подключений к Интернет.
      </Typography>

      <Typography variant="h5" gutterBottom>
        5. Права администрации в случае подозрений
      </Typography>
      <Typography variant="body1" paragraph>
        При возникновении обоснованных подозрений у администрации Сервиса в том, что пользователь пытается воспользоваться услугами Сервиса для отмывания денег или с целью проведения любых других незаконных операций, администрация имеет право:
      </Typography>
      <Typography variant="body1" paragraph>
        • Приостановить выполнение обменной операции пользователя.
      </Typography>
      <Typography variant="body1" paragraph>
        • Запросить у пользователя документы, идентифицирующие личность и иную информацию, касающуюся платежей:
      </Typography>
      <Typography variant="body1" paragraph>
        &nbsp;&nbsp;&nbsp;&nbsp;Фото одного из документов (паспорт, ID-карта или водительское удостоверение), селфи с этим документом и листом, на котором от руки будет написана сегодняшняя дата и подпись.
      </Typography>
      <Typography variant="body1" paragraph>
        &nbsp;&nbsp;&nbsp;&nbsp;В полном объеме информацию о том, посредством какой платформы средства поступили к вам (По возможности, предоставить скриншоты из истории выводов кошелька/платформы отправителя, а также ссылки на обе транзакции в эксплорере); за какую услугу вы получили средства; на какую сумму была транзакция, а также дата и время ее проведения; через какое контактное лицо вы общались с отправителем средств (По возможности, предоставьте скриншоты переписки с отправителем, где мы можем увидеть подтверждение отправки средств).
      </Typography>

      <Typography variant="h5" gutterBottom>
        6. Передача информации
      </Typography>
      <Typography variant="body1" paragraph>
        Вся информация, предоставляемая клиентом, может быть передана соответствующим органам в следующих случаях:
      </Typography>
      <Typography variant="body1" paragraph>
        • По запросу правоохранительных органов.
      </Typography>
      <Typography variant="body1" paragraph>
        • По решению судов разных инстанций.
      </Typography>
      <Typography variant="body1" paragraph>
        • По запросам администраций Платежных систем.
      </Typography>
      <Typography variant="body1" paragraph>
        6.1. Рекомендованный сервис для проверки AML риска: <Link href="https://getblock.net/" target="_blank" rel="noopener" color="inherit">https://getblock.net/</Link>
      </Typography>

      <Typography variant="h5" gutterBottom>
        7. Возврат активов, не прошедших AML проверку
      </Typography>
      <Typography variant="body1" paragraph>
        7.1 Возврат заблокированных активов, не прошедших проверку AML, возможен только после прохождения верификации личности в соответствии с пунктом 8.5 данного Соглашения и соблюдения пунктов 8.5.1.
      </Typography>
      <Typography variant="body1" paragraph>
        7.2 Возврат активов невозможен, если по данным активам был получен запрос из компетентных органов и иных ведомств, в том числе из любой юрисдикции, в этом случае заблокированный актив может проходить как вещественное доказательство в деле.
      </Typography>
      <Typography variant="body1" paragraph>
        7.3 При выполнении пунктов 8.5 и 8.5.1, возврат клиенту будет осуществлен с удержанием комиссии в размере 5%.
      </Typography>
      <Typography variant="body1" paragraph>
        7.4 Криптовалютные активы возврату и обмену не подлежат, если по результатам AML проверки системой <Link href="https://getblock.net/" target="_blank" rel="noopener" color="inherit">https://getblock.net/</Link> выявлена связь с преступными кошельками, относящимися к следующим категориям:
      </Typography>
      <ul>
        <li>DARK MARKET</li>
        <li>DARK SERVICE</li>
        <li>SCAM</li>
        <li>STOLEN</li>
        <li>MIXING (MIXER)</li>
        <li>SEXTORTION</li>
        <li>SANCTION</li>
        <li>RANSOMWARE</li>
        <li>HACK</li>
        <li>PHISHING</li>
        <li>TERRORISM FINANCING</li>
        <li>FRAUD</li>
        <li>BLACKLIST</li>
        <li>STILL UNDER INVESTIGATION</li>
        <li>CYBERCRIME ORGANIZATION</li>
        <li>NARCOTICS</li>
        <li>CHILD ABUSE</li>
        <li>HUMAN TRAFFICKING</li>
      </ul>

      <Typography variant="h5" gutterBottom>
        8. Политика KYT (Знай свою транзакцию)
      </Typography>
      <Typography variant="body1" paragraph>
        KYT (Знай свою транзакцию) направлена на идентификацию клиента сделки в случае прецедента, когда у Сервиса есть разумные подозрения в том, что Клиент использует MintSwitch не по назначению.
      </Typography>
      <Typography variant="body1" paragraph>
        Такой прецедент может возникнуть, если Сервис подозревает Клиента в незаконных действиях, которые могут быть квалифицированы как отмывание или попытка отмывания цифровых активов, полученных неправомерным путем, или средства имеют откровенно криминальное происхождение. Для этих целей Сервис вправе использовать любую законную информацию и сторонние средства анализа происхождения цифровых активов.
      </Typography>
      <Typography variant="body1" paragraph>
        В этом случае Сервис MintSwitch оставляет за собой полное право:
      </Typography>
      <Typography variant="body1" paragraph>
        • Требовать от Клиента предоставить дополнительную информацию, раскрывающую происхождение цифровых активов и/или подтверждение того, что эти активы не были получены преступным путем.
      </Typography>
      <Typography variant="body1" paragraph>
        • Заблокировать аккаунт и любые операции, связанные с клиентом, передать в контролирующие финансовую деятельность и/или правоохранительные органы по месту регистрации Сервиса и, при необходимости, по адресу регистрации Клиента всю имеющуюся по инциденту информацию и документы.
      </Typography>
      <Typography variant="body1" paragraph>
        • Требовать от Клиента документы, подтверждающие личность, физическое существование, адрес регистрации, платежеспособность.
      </Typography>
      <Typography variant="body1" paragraph>
        • Осуществлять возврат цифровых активов только на реквизиты, с которых перевод был осуществлен, или перейти на другие реквизиты после полной проверки службой безопасности Сервиса, если удалось проверить легальное происхождение средств Клиента.
      </Typography>
      <Typography variant="body1" paragraph>
        • Отказать Клиенту в выводе средств на счет третьих лиц без объяснения причин.
      </Typography>
      <Typography variant="body1" paragraph>
        • Удерживать средства клиента до полного расследования инцидента.
      </Typography>
      <Typography variant="body1" paragraph>
        • Сервис оставляет за собой право контролировать всю цепочку транзакций с целью выявления подозрительных транзакций.
      </Typography>
      <Typography variant="body1" paragraph>
        • Сервис оставляет за собой право отказать Клиенту в предоставлении услуги, если у Сервиса есть обоснованные подозрения в законности происхождения цифровых активов и удерживать средства на специальных счетах Сервиса.
      </Typography>
      <Typography variant="body1" paragraph>
        • Сервис оставляет за собой право отказать Клиенту в предоставлении услуги, если у Сервиса есть обоснованные подозрения в законности происхождения цифровых активов и удерживать средства на специальных счетах Сервиса в случае, если невозможно отследить всю цепочку движения цифровых активов с момента их появления.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Политика конфиденциальности
      </Typography>
      <Typography variant="body1" paragraph>
        Настоящая политика конфиденциальности регулирует сбор, использование и защиту персональных данных пользователей сайта MintSwitch.
      </Typography>
      <Typography variant="body1" paragraph>
        Пожалуйста, внимательно прочитайте нашу Политику конфиденциальности и убедитесь, что вы согласны с условиями её применения.
      </Typography>
    </Box>
  );
};

export default AMLPolicy;
