import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gs-folder-node',
  templateUrl: './folder-node.component.html',
  styleUrls: ['./folder-node.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FolderNodeComponent implements OnInit {

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
