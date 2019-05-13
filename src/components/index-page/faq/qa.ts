export interface Qa {
  readonly question: string;
  readonly answer: string;
}

export const qas: readonly Qa[] = [
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Pellentesque gravida in justo sit amet placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam odio sem, sagittis id massa in, rhoncus congue massa. Cras laoreet risus eget risus eleifend finibus. Morbi elementum scelerisque enim, ut fermentum ligula vestibulum in. Integer est augue, pellentesque in elementum ac, fermentum vel lacus. Suspendisse at nibh sodales, ultricies dolor non, volutpat nunc. Ut vehicula tincidunt imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis mauris fermentum, efficitur purus laoreet, tincidunt nunc. Vestibulum id quam ex. Aliquam in mattis nulla, at consequat orci. Maecenas et lobortis elit, at efficitur ipsum.',
  },
  {
    question: 'In eu felis sit amet quam sodales dictum?',
    answer:
      'Aliquam id lorem eget purus fringilla dictum. Fusce non sapien sed dui congue venenatis. Etiam congue nunc in pellentesque lobortis. Pellentesque in malesuada mi. Maecenas tempus faucibus elit, et mollis tortor. Integer vel consequat mi. Vivamus eget lacus pellentesque, tristique tortor eleifend, varius sapien. Praesent nec vehicula mi. Cras at euismod mauris. Duis iaculis placerat nisl eleifend consequat. Integer pharetra, arcu vitae faucibus egestas, nunc lorem hendrerit libero, id varius nibh magna nec justo. Curabitur a erat vitae nisi elementum iaculis in vitae nisi. In gravida vestibulum odio vitae efficitur.',
  },
  {
    question: 'Sed libero odio, volutpat et faucibus euismod, maximus a diam?',
    answer:
      'Fusce vitae tellus lacinia, volutpat ante quis, tempus velit. Sed ullamcorper consectetur quam, eu cursus est egestas ut. Ut condimentum ut dolor nec volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam ornare ipsum at sem tempus hendrerit. Sed placerat tortor ut fermentum cursus. Quisque nec tortor id nulla semper dapibus. Morbi accumsan augue id risus posuere, sed gravida libero tincidunt. Vestibulum volutpat placerat magna, vel eleifend felis. Mauris sodales vel ex nec aliquam.',
  },
];
