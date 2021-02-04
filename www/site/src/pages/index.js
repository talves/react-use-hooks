import { h } from "preact";
import { Box } from "../components/Box.js";

export default (props) => (
  <div>
    <div class="container container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
      {props.hooks &&
        props.hooks
          .filter((t) => !t.meta.draft)
          .sort((a, b) => {
            return Date.parse(a.meta.date) < Date.parse(b.meta.date) ? 1 : -1;
          })
          .map(({ meta }, index) => (
            <div class="w-full lg:w-1/2 p-3">
              <div
                key={index}
                class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-48 border shadow-lg"
              >
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <a class="p-4" href={meta.slug}>
                    <h2 class="text-2xl font-bold mb-2 text-primary-800">
                      {meta.title}
                    </h2>
                    <span class="text-gray-700">{meta.description}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
    </div>
  </div>
);
