import { auth } from "@nextAuth/auth";
import LogoutButton from "@/components/button_logout/button_logout";
import { redirect } from "next/navigation";
import ButtonDemoNotification from "@/components/button-demo-notiicaction/button_demo_notification";

export default async function DashboardPage() {
   const session = await auth();
   if (!session) redirect("/log-in");
   return (
      <div className="container outline ">

         <h1>Aqui se veran la lista de becas</h1>
         <div className="self-start text-2xl ">
            Hola, { session.user.names}
         </div>
         <div className="self-start text-2xl font-geist">
            Hola, { session.user.names}
         </div>
         <div className="self-start text-2xl font-slab  ">
            Hola, { session.user.names}
         </div>
         <div className="self-start  text-2xl font-mono">
            Hola, { session.user.names}
         </div>
         <article className="grid">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem culpa quos dicta eveniet ex consectetur officia, excepturi, veritatis nihil, dignissimos sapiente! Explicabo eum minima ad dolorem debitis rerum illo deleniti.
            Laboriosam maxime ad reiciendis rem deleniti nihil sit quaerat tenetur id dicta molestiae doloribus, architecto quibusdam nesciunt quo. Itaque velit quia laboriosam quaerat adipisci consequatur accusantium quae totam, magni atque?
            Id nisi molestiae voluptatem eum beatae quod quisquam molestias! Dolorem rerum perspiciatis minima in. Recusandae, facere? Reprehenderit accusamus placeat sed atque necessitatibus modi earum numquam quasi, reiciendis, possimus, deserunt perspiciatis!
            Similique minus perspiciatis nobis enim vitae nihil eum accusamus est voluptates veritatis omnis cupiditate ipsam iusto, magnam libero aliquam! Alias recusandae laboriosam repellendus beatae rerum illo architecto saepe id at!
            Dolores doloremque labore nulla, rerum a perspiciatis vitae similique dicta provident deserunt quas aliquam libero exercitationem commodi, quod ea aperiam! Amet qui iusto aperiam, accusamus velit facilis! Nobis, obcaecati dolorum.
            Iste, quas tenetur delectus fugiat fuga eum natus tempora laudantium debitis earum cum reprehenderit autem iusto maiores dolor corrupti aspernatur illo maxime pariatur consequatur. Voluptatibus dolore voluptatem eum voluptatum aliquid?
            Maiores, doloribus quos porro cum impedit amet reiciendis harum quaerat itaque molestias. Repudiandae consectetur temporibus id repellendus veniam qui laborum, molestiae optio corporis, accusamus ea dolores perspiciatis omnis incidunt iste.
            Molestiae blanditiis mollitia repellendus eveniet fuga saepe aspernatur voluptatum animi maiores odio? Error corporis sapiente voluptate ducimus illum doloremque esse deleniti dolores vero. Sed voluptate a quam fugit, porro quas?
            Quibusdam voluptates, id nemo ipsam, perferendis ipsum qui at beatae eaque consequuntur dignissimos iste libero incidunt distinctio repudiandae, esse assumenda? Ipsa cumque saepe iste odit numquam. Provident pariatur porro assumenda.
            Perferendis voluptates laborum cum velit sed. Sunt ea doloremque hic corporis natus ipsam. Velit, incidunt ex. Quo enim impedit perspiciatis facere deleniti neque totam, officiis vel eos in veniam ex?
            Quas recusandae consectetur numquam a, repellat assumenda illum beatae labore quos totam, voluptatibus fugit ipsum! Odio officiis molestiae nesciunt incidunt aliquid et porro nihil voluptate illum dignissimos. Aperiam, quam ipsam!
            Doloremque quaerat perferendis veritatis iusto eveniet nulla dicta aut veniam. Enim, molestias nihil nostrum reiciendis eaque, minima totam praesentium, vitae aut similique ipsa quaerat illo blanditiis velit voluptas debitis consectetur?
            Minima eveniet quisquam laudantium quasi nam perferendis qui, eius omnis, cum aut in aliquid modi ducimus suscipit, ipsam consequuntur! Rerum minima, optio illo quis veniam molestiae ea dolor possimus assumenda.
            Ut animi nobis quibusdam alias nemo inventore hic, optio, similique tempora facilis porro natus at suscipit vitae in commodi quam accusamus tenetur aliquam! In rem minus, soluta molestias doloribus illum!
            Minima tempore temporibus ipsa quia asperiores, repellat cum neque laborum labore molestias rem dicta itaque voluptatum cumque similique obcaecati ipsam commodi aspernatur necessitatibus. Corrupti amet nostrum autem provident beatae culpa.
            Nesciunt a, nostrum quis aperiam cupiditate doloribus ab, reprehenderit error voluptatum, ipsam cum dicta quibusdam aspernatur exercitationem. Itaque ab laboriosam impedit quos ducimus saepe rerum, nemo, consectetur, vel provident esse!
            Modi vel vero aspernatur magni recusandae labore, facilis numquam illo animi tenetur deleniti, provident saepe iusto ut corporis placeat dolorum sunt reprehenderit voluptate? Repellat aut magni autem necessitatibus velit aperiam!
            Nulla, cupiditate, officiis ex molestias ipsam, necessitatibus expedita iure earum cumque dignissimos a natus qui quae? Placeat nulla ducimus modi? Quas error qui aliquam porro ipsam delectus dolor esse eligendi.
            Assumenda qui vel id dicta odio recusandae quis autem, maxime quo eaque praesentium eum vero tenetur eius voluptate veniam minima nisi a, asperiores veritatis incidunt natus accusantium! Praesentium, maxime consectetur.
            Nobis quisquam in dignissimos accusamus iste voluptas nostrum rerum rem voluptates ab magni optio dolorem natus, ex, eum culpa molestiae odio hic repellendus quas? Itaque facilis architecto possimus qui voluptate!
            Dolorum quaerat quo mollitia qui ducimus veritatis harum sunt nobis quia aliquam, repellat quae, possimus saepe sequi. Voluptatibus inventore pariatur ratione commodi sed temporibus, numquam, modi aperiam beatae, mollitia ut?
            Modi unde mollitia consectetur, rem id autem! Adipisci fuga, quibusdam distinctio maxime quidem necessitatibus a asperiores reprehenderit, quasi excepturi tenetur ipsa cumque laudantium modi assumenda et? Esse nesciunt quod corrupti.
            Voluptate laborum, nobis quia officia nesciunt deleniti quod dolore fugit inventore pariatur quis non nulla voluptas cumque eius eum. Error iusto similique sed quae odio amet laborum aut. Voluptatibus, suscipit!
            Alias dolor a natus eaque voluptatem, velit officiis cupiditate doloremque placeat obcaecati sit architecto maiores suscipit. Provident ea error fugit sapiente! Iure dolor cum eius fugiat nisi provident minima impedit?
            Nesciunt dolore aperiam quo fugit sint culpa enim tempora explicabo dolor! Est, earum voluptatum. Tempore necessitatibus, sed sit deserunt at cumque ipsa, libero doloribus eaque reiciendis corrupti porro saepe beatae.
            Doloremque voluptatum obcaecati ratione placeat veritatis enim non rem architecto minima maxime, quo dolorum libero. Praesentium, enim fugiat architecto ipsum quibusdam quam nihil repellendus quia inventore iste consequuntur hic recusandae.
            Itaque, placeat esse pariatur voluptatem eveniet hic minima. Eius neque vero commodi pariatur, nihil, mollitia perferendis ex maxime illum dolorum quibusdam suscipit hic cupiditate doloremque atque! Hic quisquam beatae consequuntur.
            Distinctio, unde quia. Ab minus recusandae delectus reprehenderit corrupti dolore dicta eius nobis et eos cum odit facilis assumenda iure at doloribus perferendis saepe rem praesentium repellendus, pariatur voluptate sequi!
            Esse sit cupiditate totam repudiandae minus reprehenderit nobis illo recusandae, magni voluptatibus, vero quasi provident ipsa similique aperiam mollitia incidunt odio! Odio libero atque itaque fugiat neque, corrupti quis voluptas.
            Iure eaque repellendus qui eos aut. Delectus blanditiis esse quos nulla minus. Architecto dolorem placeat nostrum, voluptatibus neque esse deserunt nemo sunt illum cum, blanditiis atque facilis fuga ratione aliquid.
            Optio vero ea ullam velit, quidem cupiditate officiis praesentium sint deserunt nesciunt non ad recusandae commodi rerum cumque modi, voluptas illo vitae nihil perspiciatis alias consequatur aliquam esse! Nisi, earum.
            Deserunt similique molestiae recusandae ab minus, pariatur minima at, aut possimus quaerat fugit porro, ut qui! Repudiandae velit in hic odio sint explicabo, quia aperiam cumque ab dolores accusamus eos.
            Velit veritatis possimus ipsam aspernatur nisi hic eum provident, modi eveniet ipsa, rerum repellendus blanditiis corrupti vitae eius, voluptatibus impedit? Magni soluta vero nostrum saepe esse dolores quam sunt impedit?
            Pariatur, beatae illum! Voluptatum quam porro quo perferendis consequatur quae harum numquam omnis. Dolore sed laboriosam distinctio quis nobis. Minus error magnam dolore cum dolor consectetur atque id doloremque ex.
            Qui adipisci vero eligendi eos non, atque molestias minus quo? At veritatis impedit fuga, aspernatur laborum, id molestiae ad minus veniam natus eos delectus pariatur quam sequi? Incidunt, assumenda aperiam?
            Nemo tempora culpa, molestias explicabo nostrum voluptates, doloribus labore facere consequatur perspiciatis consectetur velit reiciendis similique distinctio maiores ex a accusamus. Debitis praesentium sit tempora quo assumenda quaerat ut consectetur?
            Architecto illo laborum voluptatibus iure assumenda labore dolorum non cum, ratione eum, quos necessitatibus doloribus! Expedita ex laborum aliquid reprehenderit! Necessitatibus libero ipsum porro velit? Aut officia laudantium temporibus cumque!
            Quos libero ullam aliquam, repellat iste corrupti. Nemo, officia iste. Sapiente distinctio illum ipsum, quasi dolorum minus cumque itaque assumenda eum corrupti voluptatem rem eaque, neque nihil mollitia expedita. Sunt?
            Similique autem quis voluptates, a repudiandae nulla eos. Esse voluptatem reiciendis sapiente ratione nobis doloribus, ipsum praesentium minima recusandae vero voluptatibus nemo laborum repellendus delectus, autem enim id omnis eius.
            Error inventore minus perspiciatis dignissimos optio nulla unde, aliquam itaque alias vitae similique laboriosam placeat esse eos id amet soluta dolores commodi asperiores, ullam sint eum. Enim ipsam harum tempore!
            Corporis dicta tempora voluptatem exercitationem eaque quis saepe doloribus vero architecto nemo soluta id, officiis animi non voluptatum vel a consequuntur, nesciunt praesentium eligendi beatae quod! Esse at animi consequuntur!
            Magni, deleniti optio? Sed aliquid, sapiente voluptates modi dolores ab nemo optio! Animi, id, velit aut debitis dolorem illum magni ipsam praesentium nostrum consequatur ab officiis perspiciatis impedit accusantium incidunt.
            At, rem. Distinctio officia consequatur fugiat impedit, rem modi harum vel unde officiis aliquam facilis, explicabo mollitia nisi aut sequi quibusdam odio expedita atque esse consectetur? Animi, pariatur. Vel, impedit.
            Eveniet ducimus fugit iure aperiam suscipit illum assumenda eius qui delectus, pariatur, veritatis amet vel recusandae accusamus in repellendus, corporis beatae consectetur eaque nulla deserunt? Eum dolore molestias quam fugiat?
            Expedita voluptate debitis dolorem itaque veritatis nostrum, quo explicabo aperiam optio ipsa sed libero, ex, repellendus facilis! Illum magni voluptate nobis eos quo eum modi. Eveniet neque ea eum iure.
            Tenetur, quisquam voluptatibus quas eius odio autem veritatis quis, cum non tempore libero suscipit deserunt unde obcaecati repellat laudantium nesciunt quidem reprehenderit eum dolor deleniti inventore consectetur. Minima, delectus nesciunt?
            Quod omnis necessitatibus quia distinctio ab quam nemo quos explicabo pariatur! Hic odio sed tempora deserunt aspernatur doloribus magnam quis corporis soluta, incidunt aut vel autem ab fugit excepturi harum.
            Molestiae, quos saepe. Autem enim voluptas velit libero quidem porro incidunt animi fuga quo, repellat dignissimos alias eum soluta tempora eveniet non in quis facilis minus. Assumenda consequuntur dolorem odit?
            Eos ipsa nemo soluta quas quidem quod numquam voluptatum, aliquam quis repellat consectetur ut eaque porro minima aliquid tempora dignissimos natus quo dolorem, illo dolores ducimus laborum. Aspernatur, vitae. Voluptates?
            Ex fugiat et eaque nostrum enim possimus molestias magni! Ratione libero ad itaque est, repudiandae cumque fugiat asperiores maxime numquam, repellat dignissimos, quod neque cupiditate? Ratione, obcaecati! Vitae, ea eaque.
         </article>
         <pre>{JSON.stringify(session, null, 2)}</pre>
         <LogoutButton />
         <ButtonDemoNotification/>
      </div>
   );
}
