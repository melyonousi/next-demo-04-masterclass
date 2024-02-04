import Link from "next/link"
import Container from "./components/Container"

const Home = () => {
  return (
    <main>
      <Container className={'py-5'}>
        <h2>Dashboard</h2>
        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, sapiente iusto dolorem optio eligendi corrupti porro veniam suscipit, iste voluptatum nihil numquam. Nobis necessitatibus placeat expedita excepturi maxime ea rem, consequatur dolorum repudiandae quod impedit odit quaerat est deserunt corrupti suscipit, accusamus voluptates, ex adipisci facilis exercitationem. Voluptates similique voluptatibus ullam deleniti repellat cum praesentium, ad impedit dignissimos magni iure nihil quis aliquam dolores accusantium? Laborum pariatur quaerat corrupti blanditiis suscipit harum delectus odio sunt! Nihil quo molestiae ducimus deleniti, autem tenetur, officiis quam quasi nobis cupiditate laudantium vero. Nesciunt ab soluta temporibus minus repellat accusamus culpa fugiat deleniti in.</p>

        <div className="w-full flex justify-center">
          <Link className="inline-flex px-2 py-1.5 bg-zinc-500 rounded hover:opacity-80" href={'/tickets'} >View Tickets</Link>
        </div>

        <h2>Company Updates</h2>
        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, exercitationem? Perspiciatis praesentium id distinctio odit culpa aperiam sint officia. Quasi, quibusdam eum! Tempore atque quae qui, odit culpa nulla ipsam enim. Consequatur modi nesciunt, minus quos totam repellat veritatis qui commodi non. In at perspiciatis repudiandae eligendi quas non, dolorem sit itaque mollitia soluta provident asperiores sequi vel voluptatem illo earum quaerat et atque. Quis ab animi delectus exercitationem harum qui, dolorem tempore ut quae magnam porro ipsam eos adipisci beatae ullam optio modi ea fuga consequatur unde perspiciatis hic aliquam. Maiores enim reiciendis deleniti, praesentium aspernatur libero modi quaerat autem rem, doloribus dolorem hic quia molestiae, quibusdam corporis labore! Ducimus odit earum molestias voluptates expedita assumenda at eius mollitia distinctio iste dolor natus quidem optio doloremque temporibus laboriosam ratione tempora eum saepe minus, perspiciatis omnis pariatur nemo qui? Illo at consequuntur dolore, facere odit labore suscipit eius fugit error.</p>
        <div >
          <h3>New member of the web dev team</h3>
          <p className="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui et eligendi eveniet ab officiis molestiae cumque expedita ad ea quia. Voluptatibus sit cumque vitae. Est tempore voluptatem facere? Facere quam ducimus eveniet, id atque perferendis nisi iusto? Magni voluptate eaque doloremque vitae nobis minus fugit dignissimos eos atque neque praesentium aperiam obcaecati accusamus officia enim sapiente animi ut ex ipsa voluptatum voluptas, eveniet pariatur nam? Veritatis ratione modi voluptatem maiores? Itaque eos distinctio optio voluptas aperiam impedit a enim autem, similique harum possimus sint perferendis! Non consectetur dignissimos tempore qui minus dolore alias, porro molestiae sequi vel recusandae ipsam saepe, animi quo consequatur sint. Eos dolorem minus corrupti reiciendis nisi, officiis numquam omnis vitae assumenda voluptates voluptas eligendi, molestias incidunt doloremque ratione repellat modi blanditiis nihil. Perferendis reprehenderit at illum magnam recusandae veritatis voluptatum cupiditate! Voluptatibus illo laboriosam eaque non enim minus unde quasi! Rem eius impedit architecto eos sint sunt, quis ea voluptatem facilis sapiente id doloremque tempore hic perspiciatis repellendus nesciunt illo excepturi tempora voluptates non esse? Officia rem nulla corporis, non molestiae amet ducimus sed reiciendis doloribus voluptatum culpa expedita perspiciatis odio nostrum velit facilis, quidem ipsa voluptatem quo repudiandae, sunt dicta fugit. Rerum ab veniam debitis.</p>
        </div>
        <div >
          <h3>New member of the web dev team</h3>
          <p className="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui et eligendi eveniet ab officiis molestiae cumque expedita ad ea quia. Voluptatibus sit cumque vitae. Est tempore voluptatem facere? Facere quam ducimus eveniet, id atque perferendis nisi iusto? Magni voluptate eaque doloremque vitae nobis minus fugit dignissimos eos atque neque praesentium aperiam obcaecati accusamus officia enim sapiente animi ut ex ipsa voluptatum voluptas, eveniet pariatur nam? Veritatis ratione modi voluptatem maiores? Itaque eos distinctio optio voluptas aperiam impedit a enim autem, similique harum possimus sint perferendis! Non consectetur dignissimos tempore qui minus dolore alias, porro molestiae sequi vel recusandae ipsam saepe, animi quo consequatur sint. Eos dolorem minus corrupti reiciendis nisi, officiis numquam omnis vitae assumenda voluptates voluptas eligendi, molestias incidunt doloremque ratione repellat modi blanditiis nihil. Perferendis reprehenderit at illum magnam recusandae veritatis voluptatum cupiditate! Voluptatibus illo laboriosam eaque non enim minus unde quasi! Rem eius impedit architecto eos sint sunt, quis ea voluptatem facilis sapiente id doloremque tempore hic perspiciatis repellendus nesciunt illo excepturi tempora voluptates non esse? Officia rem nulla corporis, non molestiae amet ducimus sed reiciendis doloribus voluptatum culpa expedita perspiciatis odio nostrum velit facilis, quidem ipsa voluptatem quo repudiandae, sunt dicta fugit. Rerum ab veniam debitis.</p>
        </div>

      </Container>
    </main>
  )
}

export default Home